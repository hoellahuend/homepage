import { useState } from "react";

export function useBracket(initialBracket, selectedPlayers) {
  const [bracket, setBracket] = useState(initialBracket);

  const generateKoBracket = () => {
    const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);
    const slots = [...shuffled];

    const targetSize = slots.length > 8 ? 16 : 8;
    while (slots.length < targetSize) {
      slots.push("Freilos");
    }

    let roundsData = {};

    if (targetSize === 16) {
      const af = [];
      for (let i = 0; i < 8; i++) {
        const p1 = slots[i];
        const p2 = slots[15 - i];
        af.push({
          id: `af${i + 1}`,
          p1,
          p2,
          winner: p2 === "Freilos" ? p1 : null,
        });
      }

      const qf = [
        { id: "qf1", p1: af[0].winner, p2: af[1].winner, winner: null },
        { id: "qf2", p1: af[2].winner, p2: af[3].winner, winner: null },
        { id: "qf3", p1: af[4].winner, p2: af[5].winner, winner: null },
        { id: "qf4", p1: af[6].winner, p2: af[7].winner, winner: null },
      ];

      const sf = [
        { id: "sf1", p1: null, p2: null, winner: null },
        { id: "sf2", p1: null, p2: null, winner: null },
      ];

      roundsData = {
        size: 16,
        af,
        qf,
        sf,
        final: [{ id: "f1", p1: null, p2: null, winner: null }],
        third: [{ id: "t1", p1: null, p2: null, winner: null }],
      };
    } else {
      const qf = [
        {
          id: "qf1",
          p1: slots[0],
          p2: slots[7],
          winner: slots[7] === "Freilos" ? slots[0] : null,
        },
        {
          id: "qf2",
          p1: slots[3],
          p2: slots[4],
          winner: slots[4] === "Freilos" ? slots[3] : null,
        },
        {
          id: "qf3",
          p1: slots[1],
          p2: slots[6],
          winner: slots[6] === "Freilos" ? slots[1] : null,
        },
        {
          id: "qf4",
          p1: slots[2],
          p2: slots[5],
          winner: slots[5] === "Freilos" ? slots[2] : null,
        },
      ];

      const sf = [
        { id: "sf1", p1: qf[0].winner, p2: qf[1].winner, winner: null },
        { id: "sf2", p1: qf[2].winner, p2: qf[3].winner, winner: null },
      ];

      roundsData = {
        size: 8,
        qf,
        sf,
        final: [{ id: "f1", p1: null, p2: null, winner: null }],
        third: [{ id: "t1", p1: null, p2: null, winner: null }],
      };
    }

    setBracket(roundsData);
  };

  const setKoWinner = (round, matchIndex, winnerName) => {
    if (!winnerName || winnerName === "Freilos") return;
    const next = JSON.parse(JSON.stringify(bracket));
    const match = next[round][matchIndex];
    match.winner = winnerName;
    const loserName = match.p1 === winnerName ? match.p2 : match.p1;

    if (next.size === 16) {
      if (round === "af") {
        const qfIndex = Math.floor(matchIndex / 2);
        const slotInQf = matchIndex % 2;
        if (slotInQf === 0) next.qf[qfIndex].p1 = winnerName;
        else next.qf[qfIndex].p2 = winnerName;
      } else if (round === "qf") {
        if (matchIndex === 0) next.sf[0].p1 = winnerName;
        if (matchIndex === 1) next.sf[0].p2 = winnerName;
        if (matchIndex === 2) next.sf[1].p1 = winnerName;
        if (matchIndex === 3) next.sf[1].p2 = winnerName;
      } else if (round === "sf") {
        if (matchIndex === 0) {
          next.final[0].p1 = winnerName;
          next.third[0].p1 = loserName;
        }
        if (matchIndex === 1) {
          next.final[0].p2 = winnerName;
          next.third[0].p2 = loserName;
        }
      }
    } else {
      if (round === "qf") {
        if (matchIndex === 0) next.sf[0].p1 = winnerName;
        if (matchIndex === 1) next.sf[0].p2 = winnerName;
        if (matchIndex === 2) next.sf[1].p1 = winnerName;
        if (matchIndex === 3) next.sf[1].p2 = winnerName;
      } else if (round === "sf") {
        if (matchIndex === 0) {
          next.final[0].p1 = winnerName;
          next.third[0].p1 = loserName;
        }
        if (matchIndex === 1) {
          next.final[0].p2 = winnerName;
          next.third[0].p2 = loserName;
        }
      }
    }

    setBracket(next);
  };

  return { bracket, setBracket, generateKoBracket, setKoWinner };
}
