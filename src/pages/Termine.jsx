export default function Termine({ onNavigate }) {
  const events = [
    { date: "23.01.2026", description: "Hexanacht Böcklesberger Hexa" },
    { date: "01.02.2026", description: "Umzug Rheineck" },
    { date: "07.02.2026", description: "Umzug Vaduz" },
    { date: "08.02.2026", description: "Umzug Feldkirch" },
    { date: "14.02.2026", description: "Umzug Oberriet" },
    { date: "15.02.2026", description: "Umzug Kriessern/Altstätten" },
    { date: "16.02.2026", description: "Umzug Mauren" },
    { date: "21.02.2026", description: "Umzug Trübbach" },
  ];

  // Heutiges Datum als String im gleichen Format wie die Termine
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const todayStr = `${day}.${month}.${year}`;

  return (
    <div className="relative w-full -top-4">
      {/* Flyer */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto pt-24 sm:pt-12">
        <img
          src={
            new URL(
              "../assets/bilder/Fasnachts-treff-flyer.jpg",
              import.meta.url
            ).href
          }
          alt="Flyer für die Bar am Fasnachtssamstag"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Termine */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-5xl mb-8">
          Unsere Termine
        </p>

        {/* Tabelle */}
        <div className="grid gap-4 mb-24">
          {events.map((event, index) => {
            const isToday = event.date === todayStr;

            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-4 rounded-lg ${
                  isToday ? "bg-sec text-white shadow-lg" : "dark:bg-pri"
                }`}
              >
                <div className="text-ter font-tifont text-lg sm:text-xl mx-4 sm:mx-8">
                  {event.date}
                </div>
                <div className="text-ter font-tefont text-lg sm:text-xl mt-2 sm:mt-0 sm:max-w-[60%] mx-4 sm:mx-8">
                  {event.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
