import { useState } from "react";
import TournamentManager from "../../models/TournamentManager";
import { useBracket } from "../../hooks/useBracket";

export default function TurnierEingabe({
  event,
  alleMitglieder,
  pointsTable,
  onSave,
  onBack,
  isAdmin,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState(
    event.participants || [],
  );
  const [guestName, setGuestName] = useState("");
  const [mode, setMode] = useState(event.mode || "points");
  const [sortOrder, setSortOrder] = useState(event.sortOrder || "desc");
  const [isTeamEvent, setIsTeamEvent] = useState(event.isTeamEvent || false);

  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [customTeamName, setCustomTeamName] = useState("");

  const [scores, setScores] = useState(() => {
    const map = {};
    (event.results || []).forEach((r) => {
      map[r.name] = r.rawScore ?? "";
    });
    return map;
  });

  const [matches, setMatches] = useState(event.matches || []);

  // KO-Baum Logik sauber im Custom Hook gekapselt
  const { bracket, generateKoBracket, setKoWinner } = useBracket(
    event.bracket,
    selectedPlayers,
  );

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCeremony, setShowCeremony] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const togglePlayer = (name) => {
    setSelectedPlayers((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const addGuest = () => {
    const trimmed = guestName.trim();
    if (!trimmed || selectedPlayers.includes(trimmed)) return;
    setSelectedPlayers((prev) => [...prev, trimmed]);
    setGuestName("");
  };

  const toggleTeamMember = (name) => {
    setSelectedTeamMembers((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name],
    );
  };

  const addTeam = () => {
    let teamName =
      customTeamName.trim() ||
      (selectedTeamMembers.length > 0 ? selectedTeamMembers.join(" & ") : "");
    if (!teamName || selectedPlayers.includes(teamName)) return;
    setSelectedPlayers((prev) => [...prev, teamName]);
    setCustomTeamName("");
    setSelectedTeamMembers([]);
  };

  const generateLeagueMatches = () => {
    const list = [];
    for (let i = 0; i < selectedPlayers.length; i++) {
      for (let j = i + 1; j < selectedPlayers.length; j++) {
        list.push({
          id: `${i}-${j}`,
          p1: selectedPlayers[i],
          p2: selectedPlayers[j],
          s1: 0,
          s2: 0,
          done: false,
        });
      }
    }
    setMatches(list);
  };

  // Speichern über unseren OOP TournamentManager
  const calculateAndSave = () => {
    const eventData = { ...event, mode, sortOrder, isTeamEvent };
    const manager = new TournamentManager(eventData, pointsTable);
    const finalResults = manager.calculateResults(
      selectedPlayers,
      scores,
      matches,
      bracket,
    );

    onSave({
      ...eventData,
      participants: selectedPlayers,
      results: finalResults,
      matches,
      bracket,
      status: "completed",
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const results = event.results || [];
  const totalResults = results.length;
  const reversedResults = [...results].reverse();
  const revealedItems = reversedResults.slice(0, revealedCount);
  const lowerRanksRevealed = revealedItems.filter((r) => r.rank > 3).reverse();
  const isRankRevealed = (rank) =>
    revealedItems.some((item) => item.rank === rank);

  const getPlayerImg = (name) => {
    const cleanName = name.includes(" & ") ? name.split(" & ")[0].trim() : name;
    const found = alleMitglieder.find((m) => m.name === cleanName);
    return found ? found.img : "/bilder/mitglieder/hintergrund.jpg";
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-pri/70 p-4 rounded-2xl border border-white/10">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-ter font-tefont text-sm"
        >
          ← Zurück zur Übersicht
        </button>
        <div className="text-center">
          <span className="text-xs uppercase text-sec font-tefont">
            {event.month}
          </span>
          <h2 className="font-tifont text-2xl sm:text-3xl text-ter">
            {event.name}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-green-400 font-tefont text-sm animate-pulse">
              ✓ Gespeichert!
            </span>
          )}
          <button
            onClick={calculateAndSave}
            disabled={selectedPlayers.length === 0 || !isAdmin}
            className="px-5 py-2.5 rounded-xl bg-sec text-white font-tefont text-base shadow-lg disabled:opacity-40"
          >
            Ergebnis speichern
          </button>
        </div>
      </div>

      {/* Teilnehmer-Sektion */}
      <div className="p-5 rounded-2xl bg-pri/60 border border-white/10 space-y-4">
        <h3 className="font-tifont text-xl text-sec">
          1. {isTeamEvent ? "Teams" : "Teilnehmer"} auswählen (
          {selectedPlayers.length})
        </h3>

        <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/10">
          <span className="font-tefont text-sm text-ter/70">Modus:</span>
          <button
            onClick={() => setIsTeamEvent(false)}
            className={`px-3 py-1.5 rounded-lg text-sm ${!isTeamEvent ? "bg-sec text-white" : "bg-white/10 text-ter/70"}`}
          >
            👤 Einzel
          </button>
          <button
            onClick={() => setIsTeamEvent(true)}
            className={`px-3 py-1.5 rounded-lg text-sm ${isTeamEvent ? "bg-sec text-white" : "bg-white/10 text-ter/70"}`}
          >
            👥 Team
          </button>
        </div>

        {isTeamEvent ? (
          <div className="space-y-4 bg-black/30 p-4 rounded-xl border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {alleMitglieder.map((m) => {
                const active = selectedTeamMembers.includes(m.name);
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => toggleTeamMember(m.name)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left ${active ? "bg-sec text-white border-sec font-bold" : "bg-black/20 text-ter/80 border-white/10"}`}
                  >
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <span className="text-xs truncate">{m.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-xs">
                Team:{" "}
                <strong className="text-sec">
                  {selectedTeamMembers.join(" & ") || "Keine"}
                </strong>
              </span>
              <button
                onClick={addTeam}
                disabled={selectedTeamMembers.length === 0}
                className="px-4 py-2 rounded-xl bg-sec text-white text-sm disabled:opacity-40"
              >
                + Team hinzufügen
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            <input
              type="text"
              placeholder="Gast..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="bg-black/30 border border-white/20 rounded-xl px-3 py-1.5 text-sm text-ter"
            />
            <button
              onClick={addGuest}
              className="px-3 py-1.5 rounded-xl bg-white/10 text-ter text-sm"
            >
              + Gast
            </button>
          </div>
        )}

        {!isTeamEvent && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {alleMitglieder.map((m) => {
              const active = selectedPlayers.includes(m.name);
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => togglePlayer(m.name)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left ${active ? "bg-sec text-white border-sec" : "bg-black/20 text-ter/80 border-white/10"}`}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <span className="text-sm truncate">{m.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {selectedPlayers.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedPlayers.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sec text-white text-sm"
              >
                <span>{item}</span>
                <button
                  onClick={() =>
                    setSelectedPlayers(
                      selectedPlayers.filter((p) => p !== item),
                    )
                  }
                  className="font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Modi Sektion (Punkte, Liga, KO) */}
      <div className="p-5 rounded-2xl bg-pri/60 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-tifont text-xl text-sec">
            2. Turnier-Modus & Resultate
          </h3>
          <div className="flex gap-2">
            {[
              { id: "points", label: "Punkte" },
              { id: "league", label: "Liga" },
              { id: "ko", label: "KO-Baum" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-sm ${mode === tab.id ? "bg-sec text-white" : "bg-white/10 text-ter/70"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {mode === "points" && (
          <div className="space-y-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-black/30 border border-white/20 rounded-xl px-3 py-1.5 text-sm text-ter"
            >
              <option value="desc">Mehr Punkte = Besser</option>
              <option value="asc">Weniger Schläge = Besser</option>
            </select>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedPlayers.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/25 border border-white/10"
                >
                  <span className="text-ter">{name}</span>
                  <input
                    type="number"
                    value={scores[name] ?? ""}
                    onChange={(e) =>
                      setScores({ ...scores, [name]: e.target.value })
                    }
                    className="w-24 text-right bg-pri border border-white/20 rounded-lg px-3 py-1.5 text-sec font-tifont text-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === "league" && (
          <div className="space-y-4">
            <button
              onClick={generateLeagueMatches}
              className="px-4 py-2 rounded-xl bg-sec/20 text-sec border border-sec/40 text-sm"
            >
              Spielplan generieren
            </button>
            <div className="space-y-2.5">
              {matches.map((m, idx) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/25 border border-white/10"
                >
                  <span className="w-32 truncate">{m.p1}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={m.s1}
                      onChange={(e) => {
                        const copy = [...matches];
                        copy[idx].s1 = e.target.value;
                        copy[idx].done = true;
                        setMatches(copy);
                      }}
                      className="w-14 text-center bg-pri border border-white/20 rounded-lg py-1.5"
                    />
                    <span>:</span>
                    <input
                      type="number"
                      value={m.s2}
                      onChange={(e) => {
                        const copy = [...matches];
                        copy[idx].s2 = e.target.value;
                        copy[idx].done = true;
                        setMatches(copy);
                      }}
                      className="w-14 text-center bg-pri border border-white/20 rounded-lg py-1.5"
                    />
                  </div>
                  <span className="w-32 truncate text-right">{m.p2}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === "ko" && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={generateKoBracket}
              className="px-4 py-2 rounded-xl bg-sec/20 text-sec border border-sec/40 font-tefont text-sm"
            >
              KO-Baum auslosen ({selectedPlayers.length} Teilnehmer)
            </button>

            {bracket && (
              <div className="space-y-6 pt-2">
                {bracket.size === 16 && bracket.af && (
                  <div className="space-y-3">
                    <h4 className="font-tifont text-lg text-sec">
                      Achtelfinale
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {bracket.af.map((m, idx) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5"
                        >
                          {[m.p1, m.p2].map((p, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setKoWinner("af", idx, p)}
                              className={`w-full text-left px-3 py-1.5 rounded-lg font-tefont text-xs truncate transition ${
                                m.winner === p
                                  ? "bg-sec text-white font-bold"
                                  : "bg-white/5 text-ter hover:bg-white/10"
                              }`}
                            >
                              {p || "—"}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-tifont text-lg text-sec">
                    Viertelfinale
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {bracket.qf.map((m, idx) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5"
                      >
                        {[m.p1, m.p2].map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setKoWinner("qf", idx, p)}
                            className={`w-full text-left px-3 py-2 rounded-lg font-tefont text-sm truncate transition ${
                              m.winner === p
                                ? "bg-sec text-white font-bold"
                                : "bg-white/5 text-ter hover:bg-white/10"
                            }`}
                          >
                            {p || "Wartet..."}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-tifont text-lg text-sec">Halbfinale</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                    {bracket.sf.map((m, idx) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5"
                      >
                        {[m.p1, m.p2].map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setKoWinner("sf", idx, p)}
                            className={`w-full text-left px-3 py-2 rounded-lg font-tefont text-sm truncate transition ${
                              m.winner === p
                                ? "bg-sec text-white font-bold"
                                : "bg-white/5 text-ter hover:bg-white/10"
                            }`}
                          >
                            {p || "Wartet..."}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <h4 className="font-tifont text-lg text-sec">
                      Finale (Platz 1 & 2)
                    </h4>
                    {bracket.final.map((m, idx) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl bg-sec/15 border border-sec/40 space-y-1.5"
                      >
                        {[m.p1, m.p2].map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setKoWinner("final", idx, p)}
                            className={`w-full text-left px-3 py-2 rounded-lg font-tefont text-sm truncate transition ${
                              m.winner === p
                                ? "bg-sec text-white font-bold"
                                : "bg-black/30 text-ter hover:bg-white/10"
                            }`}
                          >
                            {p || "Wartet..."}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-tifont text-lg text-ter/80">
                      Spiel um Platz 3
                    </h4>
                    {bracket.third.map((m, idx) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5"
                      >
                        {[m.p1, m.p2].map((p, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setKoWinner("third", idx, p)}
                            className={`w-full text-left px-3 py-2 rounded-lg font-tefont text-sm truncate transition ${
                              m.winner === p
                                ? "bg-sec text-white font-bold"
                                : "bg-white/5 text-ter hover:bg-white/10"
                            }`}
                          >
                            {p || "Wartet..."}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="p-5 rounded-2xl bg-pri/60 border border-sec/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-tifont text-xl text-sec">
              Gespeicherte Event-Rangliste
            </h3>
            <button
              type="button"
              onClick={() => {
                setRevealedCount(0);
                setShowCeremony(true);
              }}
              className="px-4 py-2 rounded-xl bg-sec hover:bg-sec/80 text-white font-tefont text-sm shadow-lg transition flex items-center gap-2"
            >
              🏆 Siegerehrung starten
            </button>
          </div>

          <div className="space-y-2">
            {results.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between px-4 py-2 rounded-xl bg-black/25 font-tefont text-sm"
              >
                <span>
                  <strong className="text-sec mr-2">{r.rank}.</strong> {r.name}
                  {r.teamDisplay && (
                    <span className="text-xs text-ter/60 ml-2">
                      ({r.teamDisplay})
                    </span>
                  )}
                </span>
                <span className="text-ter/70">
                  {r.rawScore} →{" "}
                  <strong className="text-sec">+{r.points} Jahrespunkte</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Siegerehrung Modal */}
      {showCeremony && (
        <div className="fixed inset-0 bg-pri/95 backdrop-blur-md z-[99999] flex flex-col justify-between p-6 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-sec font-tefont">
                Siegerehrung • {event.month}
              </span>
              <h2 className="font-tifont text-3xl sm:text-4xl text-ter">
                {event.name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {revealedCount < totalResults ? (
                <button
                  onClick={() => setRevealedCount((prev) => prev + 1)}
                  className="px-6 py-3 rounded-2xl bg-sec hover:bg-sec/90 text-white font-tifont text-lg shadow-2xl transition transform active:scale-95 whitespace-nowrap"
                >
                  Nächsten Platz aufdecken ({revealedCount + 1} / {totalResults}
                  )
                </button>
              ) : (
                <button
                  onClick={() => setShowCeremony(false)}
                  className="px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-ter font-tefont text-base whitespace-nowrap"
                >
                  Siegerehrung beenden
                </button>
              )}

              <button
                onClick={() => setShowCeremony(false)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-ter font-tefont text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto my-auto py-8 flex flex-col items-center gap-8">
            <div className="grid grid-cols-3 items-end gap-3 sm:gap-6 w-full max-w-2xl pt-8">
              {/* 2. Platz */}
              <div className="flex flex-col items-center">
                {isRankRevealed(2) ? (
                  <div
                    className="flex flex-row flex-wrap items-center justify-center gap-4 mb-3 animate-bounce"
                    style={{ animationDuration: "2s" }}
                  >
                    {results
                      .filter((r) => r.rank === 2)
                      .map((p) => (
                        <div
                          key={p.name}
                          className="flex flex-col items-center text-center"
                        >
                          <img
                            src={getPlayerImg(p.name)}
                            alt={p.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-300 mx-auto shadow-lg"
                          />
                          <p className="font-tifont text-lg sm:text-xl text-ter mt-2">
                            {p.name}
                          </p>
                          <p className="font-tefont text-xs text-gray-300">
                            +{p.points} Pkt
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="h-28 flex items-center justify-center text-white/20 font-tifont text-4xl">
                    ?
                  </div>
                )}
                <div className="w-full h-28 sm:h-36 bg-gradient-to-t from-gray-500/40 to-gray-300/30 border-t-4 border-gray-300 rounded-t-2xl flex items-center justify-center">
                  <span className="font-tifont text-4xl sm:text-5xl text-gray-200">
                    2
                  </span>
                </div>
              </div>

              {/* 1. Platz */}
              <div className="flex flex-col items-center">
                {isRankRevealed(1) ? (
                  <div
                    className="flex flex-row flex-wrap items-center justify-center gap-4 mb-3 animate-bounce"
                    style={{ animationDuration: "2s" }}
                  >
                    {results
                      .filter((r) => r.rank === 1)
                      .map((p) => (
                        <div
                          key={p.name}
                          className="flex flex-col items-center text-center"
                        >
                          <span className="text-3xl block">👑</span>
                          <img
                            src={getPlayerImg(p.name)}
                            alt={p.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-yellow-400 mx-auto shadow-xl"
                          />
                          <p className="font-tifont text-xl sm:text-2xl text-yellow-400 mt-2">
                            {p.name}
                          </p>
                          <p className="font-tefont text-xs text-yellow-200">
                            +{p.points} Pkt
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="h-36 flex items-center justify-center text-white/20 font-tifont text-5xl">
                    ?
                  </div>
                )}
                <div className="w-full h-36 sm:h-48 bg-gradient-to-t from-yellow-600/40 to-yellow-400/30 border-t-4 border-yellow-400 rounded-t-2xl flex items-center justify-center shadow-2xl">
                  <span className="font-tifont text-5xl sm:text-6xl text-yellow-300">
                    1
                  </span>
                </div>
              </div>

              {/* 3. Platz */}
              <div className="flex flex-col items-center">
                {isRankRevealed(3) ? (
                  <div
                    className="flex flex-row flex-wrap items-center justify-center gap-4 mb-3 animate-bounce"
                    style={{ animationDuration: "2s" }}
                  >
                    {results
                      .filter((r) => r.rank === 3)
                      .map((p) => (
                        <div
                          key={p.name}
                          className="flex flex-col items-center text-center"
                        >
                          <img
                            src={getPlayerImg(p.name)}
                            alt={p.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-600 mx-auto shadow-lg"
                          />
                          <p className="font-tifont text-lg sm:text-xl text-ter mt-2">
                            {p.name}
                          </p>
                          <p className="font-tefont text-xs text-amber-400">
                            +{p.points} Pkt
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center text-white/20 font-tifont text-4xl">
                    ?
                  </div>
                )}
                <div className="w-full h-20 sm:h-28 bg-gradient-to-t from-amber-800/40 to-amber-600/30 border-t-4 border-amber-600 rounded-t-2xl flex items-center justify-center">
                  <span className="font-tifont text-4xl sm:text-5xl text-amber-500">
                    3
                  </span>
                </div>
              </div>
            </div>

            {lowerRanksRevealed.length > 0 && (
              <div className="w-full max-w-xl space-y-2 pt-4 border-t border-white/10">
                {lowerRanksRevealed.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-tifont text-lg text-sec w-6">
                        {r.rank}.
                      </span>
                      <img
                        src={getPlayerImg(r.name)}
                        alt={r.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-tefont text-base text-ter">
                        {r.name}
                      </span>
                    </div>
                    <span className="font-tefont text-sm text-ter/70">
                      +{r.points} Pkt
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full max-w-xl mx-auto pb-4"></div>
        </div>
      )}
    </div>
  );
}
