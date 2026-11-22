export default class TournamentManager {
  constructor(event, pointsTable) {
    this.event = event;
    this.pointsTable = pointsTable;
  }

  // Berechnet die Rangliste je nach Modus
  calculateResults(selectedPlayers, scores, matches, bracket) {
    let rankedNames = [];

    if (this.event.mode === "points") {
      rankedNames = [...selectedPlayers]
        .map((name) => ({
          name,
          rawScore: Number(scores[name] || 0),
        }))
        .sort((a, b) =>
          this.event.sortOrder === "desc"
            ? b.rawScore - a.rawScore
            : a.rawScore - b.rawScore,
        );
    } else if (this.event.mode === "league") {
      const stats = {};
      selectedPlayers.forEach((p) => {
        stats[p] = { name: p, wins: 0, diff: 0 };
      });
      matches.forEach((m) => {
        if (!m.done) return;
        const s1 = Number(m.s1);
        const s2 = Number(m.s2);
        stats[m.p1].diff += s1 - s2;
        stats[m.p2].diff += s2 - s1;
        if (s1 > s2) stats[m.p1].wins += 1;
        if (s2 > s1) stats[m.p2].wins += 1;
      });
      rankedNames = Object.values(stats)
        .sort((a, b) => (b.wins !== a.wins ? b.wins - a.wins : b.diff - a.diff))
        .map((s) => ({ name: s.name, rawScore: `${s.wins} Siege` }));
    } else if (this.event.mode === "ko" && bracket) {
      const f = bracket.final[0];
      const t = bracket.third[0];
      const order = [];

      if (f.winner) {
        order.push(f.winner);
        const loserFinal = f.p1 === f.winner ? f.p2 : f.p1;
        if (loserFinal) order.push(loserFinal);
      }
      if (t.winner) {
        order.push(t.winner);
        const loserThird = t.p1 === t.winner ? t.p2 : t.p1;
        if (loserThird) order.push(loserThird);
      }

      selectedPlayers.forEach((p) => {
        if (p && p !== "Freilos" && !order.includes(p)) {
          order.push(p);
        }
      });

      rankedNames = order
        .filter((name) => name && name !== "Freilos")
        .map((name, index) => ({
          name,
          rawScore:
            index === 0
              ? "Turniersieger"
              : index === 1
                ? "2. Platz"
                : index === 2
                  ? "3. Platz"
                  : `Rang ${index + 1}`,
        }));
    }

    return this._applyTiesAndPoints(rankedNames);
  }

  // Interne Methode für die "1224"-Regel (Punktgleichheit) & Team-Aufteilung
  _applyTiesAndPoints(rankedNames) {
    let finalResults = [];
    let currentRank = 1;

    for (let i = 0; i < rankedNames.length; i++) {
      const current = rankedNames[i];
      if (i > 0 && current.rawScore === rankedNames[i - 1].rawScore) {
        const prevResult = finalResults[i - 1];
        finalResults.push({
          name: current.name,
          rawScore: current.rawScore,
          rank: prevResult.rank,
          points: prevResult.points,
        });
      } else {
        currentRank = i + 1;
        finalResults.push({
          name: current.name,
          rawScore: current.rawScore,
          rank: currentRank,
          points: this.pointsTable[currentRank - 1] || 1,
        });
      }
    }

    // Team-Mitglieder Aufteilung für die Gesamtrangliste
    if (this.event.isTeamEvent) {
      const expandedResults = [];
      finalResults.forEach((res) => {
        const members = res.name.split(" & ").map((m) => m.trim());
        if (members.length > 1) {
          members.forEach((memberName) => {
            expandedResults.push({
              name: memberName,
              rawScore: res.rawScore,
              rank: res.rank,
              points: res.points,
              teamDisplay: res.name,
            });
          });
        } else {
          expandedResults.push(res);
        }
      });
      return expandedResults;
    }

    return finalResults;
  }
}
