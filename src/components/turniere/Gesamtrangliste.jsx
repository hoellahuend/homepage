export default function Gesamtrangliste({ events, alleMitglieder }) {
  const completedEvents = events.filter(
    (e) => e.results && e.results.length > 0,
  );

  const playerMap = {};

  completedEvents.forEach((ev) => {
    ev.results.forEach((res) => {
      if (!playerMap[res.name]) {
        const memberInfo = alleMitglieder.find((m) => m.name === res.name);
        playerMap[res.name] = {
          name: res.name,
          img: memberInfo
            ? memberInfo.img
            : "/bilder/mitglieder/hintergrund.jpg",
          totalPoints: 0,
          eventsPlayed: 0,
          wins: 0,
          breakdown: [],
        };
      }
      playerMap[res.name].totalPoints += res.points;
      playerMap[res.name].eventsPlayed += 1;
      if (res.rank === 1) playerMap[res.name].wins += 1;
      playerMap[res.name].breakdown.push({
        event: ev.name,
        month: ev.month,
        rank: res.rank,
        points: res.points,
      });
    });
  });

  const ranking = Object.values(playerMap).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    return b.wins - a.wins;
  });

  if (ranking.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-pri/60 border border-white/10 text-center">
        <p className="font-tifont text-2xl text-sec mb-2">
          Noch keine Ergebnisse eingetragen
        </p>
        <p className="font-tefont text-ter/70">
          Wechsle oben auf den Tab „Events“, wähle ein Turnier aus und trage die
          ersten Resultate ein.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-xl bg-pri/70 border border-white/10">
          <span className="text-xs uppercase text-ter/60 font-tefont">
            Gespielte Events
          </span>
          <p className="text-2xl sm:text-3xl font-tifont text-sec mt-1">
            {completedEvents.length} / {events.length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-pri/70 border border-white/10">
          <span className="text-xs uppercase text-ter/60 font-tefont">
            Aktueller Leader
          </span>
          <p className="text-xl sm:text-2xl font-tifont text-ter mt-1 truncate">
            {ranking[0]?.name}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-pri/70 border border-white/10">
          <span className="text-xs uppercase text-ter/60 font-tefont">
            Punktesystem
          </span>
          <p className="text-xs sm:text-sm font-tefont text-ter/80 mt-2">
            10-8-6-5-4-3-2-1 Pkt.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {ranking.map((player, index) => {
          const rank = index + 1;
          const isTop3 = rank <= 3;

          return (
            <div
              key={player.name}
              className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                rank === 1
                  ? "bg-sec/20 border-sec shadow-lg"
                  : "bg-pri/80 border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-tifont text-xl sm:text-2xl shrink-0 ${
                    rank === 1
                      ? "bg-sec text-white"
                      : isTop3
                        ? "bg-sec/30 text-sec border border-sec/40"
                        : "bg-white/5 text-ter/70"
                  }`}
                >
                  {rank}.
                </div>

                <img
                  src={player.img}
                  alt={player.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20 hidden sm:block"
                />

                <div>
                  <h3 className="font-tefont text-lg sm:text-xl font-semibold text-ter">
                    {player.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {player.breakdown.map((b, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-black/30 text-ter/70 font-tefont"
                      >
                        {b.event}: {b.points} Pkt ({b.rank}.)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right pl-4">
                <span className="font-tifont text-3xl sm:text-4xl text-sec">
                  {player.totalPoints}
                </span>
                <span className="block text-xs uppercase tracking-wider text-ter/60 font-tefont">
                  Punkte ({player.eventsPlayed}x)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
