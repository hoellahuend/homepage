import flyerImg from "../assets/bilder/Fasnachts-treff-flyer.jpg";

export default function Termine({ onNavigate }) {
  const events = [
    {
      date: "21.01.2027",
      description: "Hexanacht Böcklesberger Hexa",
      location: "Mittelneufnach",
    },
    {
      date: "23.01.2027",
      description: "Umzug Weinfelden",
      location: "Weinfelden",
    },
    { date: "30.01.2027", description: "Umzug Rebstein", location: "Rebstein" },
    {
      date: "31.01.2027",
      description: "Umzug Feldkirch",
      location: "Feldkirch",
    },
    { date: "06.02.2027", description: "Umzug Oberriet", location: "Oberriet" },
    {
      date: "07.02.2027",
      description: "Umzug St.Gallen",
      location: "St. Gallen",
    },
    { date: "08.02.2027", description: "Umzug Mauren", location: "Mauren" },
    { date: "13.02.2027", description: "Umzug Trübbach", location: "Trübbach" },
  ];

  const monthNames = [
    "JAN",
    "FEB",
    "MÄR",
    "APR",
    "MAI",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OKT",
    "NOV",
    "DEZ",
  ];

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const enrichedEvents = events.map((event) => {
    const eventDate = parseDate(event.date);
    const [day, month, year] = event.date.split(".");
    const isToday = eventDate.getTime() === today.getTime();
    const isPast = eventDate.getTime() < today.getTime();

    return {
      ...event,
      day,
      monthShort: monthNames[Number(month) - 1],
      year,
      isToday,
      isPast,
    };
  });

  const nextEventIndex = enrichedEvents.findIndex(
    (e) => !e.isPast && !e.isToday,
  );

  return (
    <div className="relative w-full -top-4 px-4 sm:px-0">
      <div className="w-full sm:w-4/5 md:w-3/5 max-w-3xl mx-auto pt-24 sm:pt-12">
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-pri/40 backdrop-blur-sm">
          <img
            src={flyerImg}
            alt="Flyer für die Bar am Fasnachtssamstag"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      </div>

      <div className="w-full sm:w-4/5 md:w-3/5 max-w-3xl mx-auto py-14">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 mb-3 text-xs tracking-widest uppercase font-tefont rounded-full bg-sec/15 text-sec border border-sec/30">
            Tourplan 2027
          </span>
          <h2 className="text-sec font-tifont text-4xl sm:text-5xl md:text-6xl tracking-wide">
            Unsere Termine
          </h2>
        </div>

        <div className="flex flex-col gap-3.5 mb-24">
          {enrichedEvents.map((event, index) => {
            const isNext = index === nextEventIndex;

            return (
              <div
                key={index}
                className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-300 ${
                  event.isToday
                    ? "bg-sec text-white border-sec shadow-lg shadow-sec/25 scale-[1.01]"
                    : isNext
                      ? "dark:bg-pri bg-white/5 border-sec/60 shadow-md"
                      : event.isPast
                        ? "dark:bg-pri/40 border-white/5 opacity-50"
                        : "dark:bg-pri/80 bg-white/5 border-white/10 hover:border-sec/50 hover:-translate-y-0.5 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div
                    className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg shrink-0 transition-colors ${
                      event.isToday
                        ? "bg-white/20 text-white"
                        : "bg-sec/15 text-sec border border-sec/25 group-hover:bg-sec group-hover:text-white"
                    }`}
                  >
                    <span className="font-tifont text-xl sm:text-2xl leading-none">
                      {event.day}
                    </span>
                    <span className="font-tefont text-xs uppercase tracking-wider mt-1">
                      {event.monthShort}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-tefont text-lg sm:text-xl font-medium leading-snug ${
                          event.isToday ? "text-white" : "text-ter"
                        }`}
                      >
                        {event.description}
                      </h3>

                      {event.isToday && (
                        <span className="px-2.5 py-0.5 text-xs font-tefont uppercase tracking-wider rounded-full bg-white text-sec font-bold animate-pulse">
                          Heute
                        </span>
                      )}

                      {isNext && !event.isToday && (
                        <span className="px-2.5 py-0.5 text-xs font-tefont uppercase tracking-wider rounded-full bg-sec/20 text-sec border border-sec/40">
                          Nächster Auftritt
                        </span>
                      )}
                    </div>

                    <span
                      className={`font-tefont text-xs sm:text-sm mt-0.5 ${
                        event.isToday ? "text-white/80" : "text-ter/60"
                      }`}
                    >
                      {event.date} {event.location ? `• ${event.location}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
