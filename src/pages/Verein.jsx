import mottoData from "../data/motto.json";
import { useState } from "react";
import mitgliederData from "../data/mitglieder.json";

export default function Verein() {
  const {
    aktuellesMotto,
    schollenKrieger,
    hunde,
    jaeger,
    untoten,
    raubritter,
    sumpfschratten,
    hundeAlt,
  } = mottoData;
  const [isOpen, setIsOpen] = useState(false);
  const { mitglieder } = mitgliederData;
  const getImgUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <div className="relative w-full -top-4">
      {/* Mitglieder */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-5xl mb-12">
          Unsere Mitglieder
        </p>

        {/* Karten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-16 sm:px-0">
          {mitglieder.map((mitglied, index) => (
            <div
              key={index}
              className="bg-white dark:bg-pri rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/3]">
                <img
                  // Hier wird die Basis-URL (z.B. /homepage/) vor den Pfad aus dem JSON gesetzt
                  src={getImgUrl(mitglied.img)}
                  alt={mitglied.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <p className="text-lg font-tefont text-ter">{mitglied.name}</p>
                {mitglied.role && (
                  <p className="text-sm font-tefont text-sec mt-1">
                    {mitglied.role}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12 px-8">
          <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
            Gesucht: neue Mitglieder
          </p>

          <div className="text-center text-ter font-tefont text-lg sm:text-xl md:text-3xl p-4 sm:p-6 md:p-8 space-y-4">
            <p>
              Wir sind eine bunt zusammengewürfelte Truppe von Diepoldsau bis
              Oberriet, die gerne die Rheintaler Fasnacht mit ausgefallenen
              Themen bereichert. Erlebe mit uns unvergessliche Fasnachtsmomente
              und lustige Stunden!
            </p>

            <p>Für unsere Truppe suchen wir dich:</p>

            <ul className="list-disc list-inside">
              <li>Alter 18-99 Jahre</li>
              <li>Männlich</li>
              <li>Teamfähig</li>
            </ul>

            <p>
              Nimm Kontakt auf unter:{" "}
              <a
                href="mailto:hoellahund@gmail.com"
                className="text-sec underline hover:text-pri transition-colors"
              >
                hoellahuend@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Unser Aktuelles Motto */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12 px-8">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-6xl">
          Unser aktuelles Motto
        </p>
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {aktuellesMotto.title}
        </p>

        {/* Text mit Zeilenumbrüchen */}
        <div className="text-center text-ter font-tefont text-lg sm:text-xl md:text-3xl p-4 sm:p-6 md:p-8 whitespace-pre-line">
          {aktuellesMotto.text}
        </div>

        {aktuellesMotto.image && (
          <img
            src={getImgUrl(aktuellesMotto.image)}
            alt={aktuellesMotto.title}
            className="rounded-lg shadow-lg mb-6 w-full"
          />
        )}

        {aktuellesMotto.video && (
          <video controls className="w-full rounded-lg shadow-lg">
            <source src={aktuellesMotto.video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* alte Mottos */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12 px-8">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-6xl">
          Alte Mottos
        </p>
        <div
          className="flex justify-center items-center cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
            {schollenKrieger.title}
          </p>
          <span className="ml-4 text-2xl">{isOpen ? "▲" : "▼"}</span>
        </div>
        {schollenKrieger.image && (
          <img
            src={getImgUrl(schollenKrieger.image)}
            alt={schollenKrieger.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
        {/* Klappbarer Inhalt */}
        {isOpen && (
          <div>
            <p className="whitespace-pre-line text-center text-ter font-tefont text-lg sm:text-xl md:text-3xl p-4 sm:p-6 md:p-8">
              {schollenKrieger.text}
            </p>

            {schollenKrieger.video && (
              <video controls className="w-full rounded-lg shadow-lg pb-16">
                <source src={schollenKrieger.video} type="video/mp4" />
              </video>
            )}
          </div>
        )}
        {/* hunde */}
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {hunde.title}
        </p>
        {hunde.image && (
          <img
            src={getImgUrl(hunde.image)}
            alt={hunde.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
        {/* jäger */}
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {jaeger.title}
        </p>
        {jaeger.image && (
          <img
            src={getImgUrl(jaeger.image)}
            alt={jaeger.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
        {/* untoten */}
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {untoten.title}
        </p>
        {untoten.image && (
          <img
            src={getImgUrl(untoten.image)}
            alt={untoten.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
        {/* raubritter */}
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {raubritter.title}
        </p>
        {raubritter.image && (
          <img
            src={getImgUrl(raubritter.image)}
            alt={raubritter.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
        {/* sumpfschratten */}
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {sumpfschratten.title}
        </p>
        {sumpfschratten.image && (
          <img
            src={getImgUrl(sumpfschratten.image)}
            alt={sumpfschratten.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
        {/* Hunde Alt */}
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {hundeAlt.title}
        </p>
        {hundeAlt.image && (
          <img
            src={getImgUrl(hundeAlt.image)}
            alt={hundeAlt.title}
            className="rounded-lg shadow-lg mb-6 mt-6 w-full"
          />
        )}
      </div>

      {/* abstand */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12"></div>
    </div>
  );
}
