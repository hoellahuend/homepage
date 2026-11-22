import { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import mitgliederData from "../data/mitglieder.json";
import Gesamtrangliste from "../components/turniere/Gesamtrangliste";
import EventListe from "../components/turniere/EventListe";
import TurnierEingabe from "../components/turniere/TurnierEingabe";

const POINTS_TABLE = [10, 8, 6, 5, 4, 3, 2, 1];

const DEFAULT_IDEAS = [
  "Bowling",
  "Billard",
  "Dart-Turnier",
  "Cornhole-Turnier",
  "Minigolf",
  "Beizentour & Quiz",
  "Töggeli-Turnier",
  "Herbstfest",
  "Karaoke-Bingo",
  "Jass-Turnier",
  "Tischtennis",
  "Pétanque",
  "Mölkky",
  "Mario-Kart-Turnier",
  "Flipperkasten-Turnier",
  "Pubquiz",
];

export default function Turniere() {
  const alleMitglieder = mitgliederData.mitglieder
    .filter((m) => m && m.name && m.name.trim() !== "")
    .map((m, idx) => ({
      id: `m-${idx}`,
      name: m.name.trim(),
      role: m.role || "",
      img: m.img ? `/${m.img}` : "/bilder/mitglieder/hintergrund.jpg",
    }));

  const [seasons, setSeasons] = useState({
    2027: { year: "2027", events: [] },
  });
  const [quickIdeas, setQuickIdeas] = useState(DEFAULT_IDEAS);

  const [selectedYear, setSelectedYear] = useState("2027");
  const [activeTab, setActiveTab] = useState("rangliste");
  const [activeEventId, setActiveEventId] = useState(null);

  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [newYearInput, setNewYearInput] = useState("");
  const [showNewYearModal, setShowNewYearModal] = useState(false);

  // Auth Status überwachen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Daten aus Firestore laden
  useEffect(() => {
    async function fetchSeasons() {
      try {
        const docRef = doc(db, "meisterschaft", "daten");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.seasons) setSeasons(data.seasons);
          if (data.quickIdeas) setQuickIdeas(data.quickIdeas);
        }
      } catch (err) {
        console.error("Fehler beim Laden aus Firebase:", err);
      }
    }
    fetchSeasons();
  }, []);

  // Daten in Firestore speichern
  const saveToFirebase = async (updatedSeasons, updatedIdeas = quickIdeas) => {
    setSeasons(updatedSeasons);
    setQuickIdeas(updatedIdeas);
    try {
      await setDoc(doc(db, "meisterschaft", "daten"), {
        seasons: updatedSeasons,
        quickIdeas: updatedIdeas,
      });
    } catch (err) {
      console.error("Fehler beim Speichern in Firebase:", err);
      alert(
        "Fehler beim Speichern in der Cloud. Bist du als Admin eingeloggt?",
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoginError("Login fehlgeschlagen. E-Mail oder Passwort falsch.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const currentSeason = seasons[selectedYear] || {
    year: selectedYear,
    events: [],
  };

  const updateEvent = (updatedEvent) => {
    const updatedSeasons = {
      ...seasons,
      [selectedYear]: {
        ...seasons[selectedYear],
        events: seasons[selectedYear].events.map((ev) =>
          ev.id === updatedEvent.id ? updatedEvent : ev,
        ),
      },
    };
    saveToFirebase(updatedSeasons, quickIdeas);
  };

  const addEvent = (month, name, mode) => {
    const cleanName = name.trim();
    const newEv = {
      id: `evt-${Date.now()}`,
      month,
      name: cleanName,
      mode,
      sortOrder: cleanName.toLowerCase().includes("minigolf") ? "asc" : "desc",
      status: "planned",
      participants: [],
      results: [],
      matches: [],
      bracket: null,
    };

    // Neuen Event-Namen automatisch zu den Schnellzugriffen hinzufügen, falls noch nicht vorhanden
    let updatedIdeas = [...quickIdeas];
    if (
      cleanName &&
      !updatedIdeas.some(
        (idea) => idea.toLowerCase() === cleanName.toLowerCase(),
      )
    ) {
      updatedIdeas.push(cleanName);
    }

    const updatedSeasons = {
      ...seasons,
      [selectedYear]: {
        ...seasons[selectedYear],
        events: [...seasons[selectedYear].events, newEv],
      },
    };
    saveToFirebase(updatedSeasons, updatedIdeas);
  };

  const deleteEvent = (eventId) => {
    const updatedSeasons = {
      ...seasons,
      [selectedYear]: {
        ...seasons[selectedYear],
        events: seasons[selectedYear].events.filter((ev) => ev.id !== eventId),
      },
    };
    saveToFirebase(updatedSeasons, quickIdeas);
    if (activeEventId === eventId) setActiveEventId(null);
  };

  const createSeason = () => {
    const yearStr = newYearInput.trim();
    if (!yearStr || seasons[yearStr]) return;

    // Neues Jahr startet flexibel ohne fixe Vorgaben
    const updatedSeasons = {
      ...seasons,
      [yearStr]: {
        year: yearStr,
        events: [],
      },
    };
    saveToFirebase(updatedSeasons, quickIdeas);
    setSelectedYear(yearStr);
    setNewYearInput("");
    setShowNewYearModal(false);
  };

  const activeEvent = currentSeason.events.find((e) => e.id === activeEventId);

  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-4 sm:px-6 pb-24 text-ter relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-white/10 relative z-30">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-sec font-tefont">
              Vereinsmeisterschaft {selectedYear}
            </span>
            {user ? (
              <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400 font-tefont">
                Admin aktiv
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-ter/60 font-tefont">
                Ansichts-Modus
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-tifont text-sec mt-1">
            Jahresrangliste & Events
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setActiveEventId(null);
            }}
            className="bg-pri border border-white/20 text-ter font-tefont rounded-xl px-4 py-2.5 text-base focus:outline-none focus:border-sec"
          >
            {Object.keys(seasons)
              .sort((a, b) => b.localeCompare(a))
              .map((y) => (
                <option key={y} value={y}>
                  Saison {y}
                </option>
              ))}
          </select>

          {user && (
            <button
              onClick={() => setShowNewYearModal(true)}
              className="px-4 py-2.5 rounded-xl bg-sec/20 text-sec border border-sec/40 hover:bg-sec hover:text-white font-tefont text-sm transition"
            >
              + Neues Jahr
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 font-tefont text-sm"
              title="Admin Abmelden"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-ter font-tefont text-sm border border-white/10"
              title="Admin Login für Tablet"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[99999] p-4">
          <form
            onSubmit={handleLogin}
            className="bg-pri border border-sec/40 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl"
          >
            <h3 className="font-tifont text-2xl text-sec">Admin Login</h3>
            <p className="font-tefont text-xs text-ter/70">
              Nur für Organisatoren zum Eintragen von Ergebnissen.
            </p>
            {loginError && (
              <p className="text-red-400 text-xs font-tefont">{loginError}</p>
            )}
            <div>
              <label className="block text-xs uppercase text-ter/70 mb-1 font-tefont">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2.5 text-ter"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-ter/70 mb-1 font-tefont">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2.5 text-ter"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-ter font-tefont text-sm"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sec text-white font-tefont text-sm"
              >
                Einloggen
              </button>
            </div>
          </form>
        </div>
      )}

      {showNewYearModal && (
        <div className="mt-4 p-4 rounded-xl bg-pri border border-sec/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-tefont text-sm">
              Neues Meisterschaftsjahr anlegen:
            </span>
            <input
              type="text"
              placeholder="z. B. 2028"
              value={newYearInput}
              onChange={(e) => setNewYearInput(e.target.value)}
              className="bg-black/30 border border-white/20 rounded-lg px-3 py-1.5 text-ter w-28"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={createSeason}
              className="px-4 py-1.5 rounded-lg bg-sec text-white font-tefont text-sm"
            >
              Erstellen
            </button>
            <button
              onClick={() => setShowNewYearModal(false)}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-ter font-tefont text-sm"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {!activeEvent && (
        <div className="flex gap-2 my-6 bg-pri/60 p-1.5 rounded-2xl border border-white/10 max-w-md">
          <button
            onClick={() => setActiveTab("rangliste")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-tefont text-base transition ${
              activeTab === "rangliste"
                ? "bg-sec text-white shadow-md"
                : "text-ter/70 hover:text-ter"
            }`}
          >
            Jahres-Rangliste
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-tefont text-base transition ${
              activeTab === "events"
                ? "bg-sec text-white shadow-md"
                : "text-ter/70 hover:text-ter"
            }`}
          >
            Events ({currentSeason.events.length})
          </button>
        </div>
      )}

      {activeEvent ? (
        <TurnierEingabe
          event={activeEvent}
          alleMitglieder={alleMitglieder}
          pointsTable={POINTS_TABLE}
          onSave={updateEvent}
          onBack={() => setActiveEventId(null)}
          isAdmin={!!user}
        />
      ) : activeTab === "rangliste" ? (
        <Gesamtrangliste
          events={currentSeason.events}
          alleMitglieder={alleMitglieder}
        />
      ) : (
        <EventListe
          events={currentSeason.events}
          reserveIdeas={quickIdeas}
          onSelectEvent={(id) => setActiveEventId(id)}
          onAddEvent={addEvent}
          onDeleteEvent={deleteEvent}
          isAdmin={!!user}
        />
      )}
    </div>
  );
}
