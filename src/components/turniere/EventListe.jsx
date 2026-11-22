import { useState } from "react";

export default function EventListe({
  events,
  reserveIdeas,
  onSelectEvent,
  onAddEvent,
  onDeleteEvent,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [month, setMonth] = useState("November");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("points");

  const modeLabels = {
    points: "Punktewertung",
    league: "Gruppenphase / Liga",
    ko: "KO-Turnierbaum",
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddEvent(month, name.trim(), mode);
    setName("");
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-tifont text-2xl sm:text-3xl text-sec">
          Jahresprogramm
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-xl bg-sec text-white font-tefont text-sm sm:text-base shadow-md"
        >
          + Event hinzufügen
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleCreate}
          className="p-5 rounded-2xl bg-pri border border-sec/40 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase text-ter/70 mb-1 font-tefont">
                Monat
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2.5 text-ter"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-ter/70 mb-1 font-tefont">
                Disziplin / Eventname
              </label>
              <input
                type="text"
                placeholder="z. B. Jass-Turnier"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2.5 text-ter"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-ter/70 mb-1 font-tefont">
                Turnier-Modus
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2.5 text-ter"
              >
                <option value="points">Punktewertung (Bowling, Quiz...)</option>
                <option value="league">
                  Gruppenphase (Billard, Mario Kart...)
                </option>
                <option value="ko">KO-Turnierbaum (Dart, Töggeli...)</option>
              </select>
            </div>
          </div>

          <div>
            <span className="block text-xs uppercase text-ter/60 mb-2 font-tefont">
              Schnellauswahl aus Reserve-Ideen:
            </span>
            <div className="flex flex-wrap gap-2">
              {reserveIdeas.map((idea) => (
                <button
                  type="button"
                  key={idea}
                  onClick={() => setName(idea)}
                  className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-sec/30 text-ter border border-white/10 transition"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-white/10 text-ter font-tefont text-sm"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sec text-white font-tefont text-sm"
            >
              Event speichern
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => {
          const isCompleted = ev.results && ev.results.length > 0;
          const winner = isCompleted
            ? ev.results.find((r) => r.rank === 1)
            : null;

          return (
            <div
              key={ev.id}
              onClick={() => onSelectEvent(ev.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition hover:-translate-y-0.5 ${
                isCompleted
                  ? "bg-pri/80 border-sec/50"
                  : "bg-pri/50 border-white/10 hover:border-sec/40"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-sec font-tefont">
                    {ev.month} • {modeLabels[ev.mode]}
                  </span>
                  <h3 className="font-tifont text-2xl text-ter mt-1">
                    {ev.name}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-tefont ${
                    isCompleted
                      ? "bg-sec/20 text-sec border border-sec/40"
                      : "bg-white/10 text-ter/60"
                  }`}
                >
                  {isCompleted ? "Abgeschlossen" : "Offen"}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-sm font-tefont">
                {winner ? (
                  <span className="text-ter/90">
                    Sieger: <strong className="text-sec">{winner.name}</strong>{" "}
                    ({ev.results.length} Teiln.)
                  </span>
                ) : (
                  <span className="text-ter/60">
                    Antippen zum Starten & Eintragen
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(`Event "${ev.name}" wirklich löschen?`)
                    ) {
                      onDeleteEvent(ev.id);
                    }
                  }}
                  className="text-xs text-ter/40 hover:text-red-400 px-2 py-1"
                >
                  Löschen
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
