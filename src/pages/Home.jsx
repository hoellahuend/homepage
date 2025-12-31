import React from "react";
import GruppenBild from "../assets/bilder/gruppenbild.jpg";
import mottoData from "../data/motto.json";

export default function Home() {
  const { aktuellesMotto } = mottoData;
  return (
    <div className="relative w-full ">
      {/* Hintergrundbild */}
      <div
        className="w-full h-[calc(100vh-6rem)] relative"
        style={{ top: "-3rem" }} // Header-Höhe ausgleichen
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${GruppenBild})` }}
        ></div>

        {/* Schwarzes Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Titel */}
        <div className="relative z-10 flex items-end justify-center h-full pb-28">
          <h1 className="text-qui text-6xl md:text-8xl font-tifont text-center drop-shadow-dropShadow">
            Wichastoaner Höllahünd
          </h1>
        </div>
      </div>

      {/* Flyer */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12">
        <img
          src={
            new URL(
              "../assets/bilder/Fasnachts-treff-flyer.jpg",
              import.meta.url
            ).href
          }
          alt="Flyer für die Bar am Fasnachtssamstag"
        />
      </div>
      {/* Unser Motto*/}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12 px-8">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-6xl">
          Unser aktuelles Motto
        </p>
        <p className="text-center text-ter font-tefont font-bold text-xl sm:text-2xl md:text-5xl p-4 sm:p-6 md:pb-4">
          {aktuellesMotto.title}
        </p>

        <p className="text-center text-ter font-tefont text-lg sm:text-xl md:text-3xl p-4 sm:p-6 md:p-8">
          {aktuellesMotto.text}
        </p>
        {aktuellesMotto.video && (
          <video controls className="w-full rounded-lg shadow-lg pt-8">
            <source src={aktuellesMotto.video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Geschichte */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12 px-8">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-6xl">
          Unsere Geschichte
        </p>
        <p className="text-center text-ter font-tefont text-lg sm:text-xl md:text-3xl p-4 sm:p-6 md:p-8">
          Bei der Wichensteiner Höhle handelt es sich um die einzige Höhlenburg
          weit und breit. Vielen Geheimnisse und Rätsel wandern rund um diese
          Burg. Unheimlich muss er der Bevölkerung vorgekommen sein, dieser Ort
          in der Ostwand des Semelenberges. Dass es hier nicht mit rechten
          Dingen zu und her ging, stand während Jahrunderten fest. Man mied
          diesen Ort, wo Gespenster ein und aus gingen, wo unerlöste Seelen
          hausten und wo ganz offensichtlich der Teufel das Sagen hatte. Drei
          Raubritter haben gemeinsam in Wichenstein gehaust. Vor ihnen war - so
          will es die Überlieferung - nichts sicher. Reisende wurden überfallen,
          sowie Schlösser und Kirchen geplündert. Nicht selten fanden bei diesen
          Raubzügen auch Menschen den Tod. Man verschaffte sie an heimliche
          Orte. Mit der Zeit wurden die drei Raubritter - Adrian, Udalrich und
          Beno - weitherum berühmt und berüchtigt. Nicht zuletzt dank drei
          kohlschwarzen, schrecklich anmutenden Hunden überstanden sie ihre
          Raubzüge unbeschadet. Als die drei Raubritter dann trotz des Schutzes,
          den sie durch ihre gefürchteten Hunde genossen, gestorben waren, soll
          der Teufel ihre Seelen nicht nur geholt, sondern auch in die drei
          Hunde gebannt haben. Diese Hunde trieben nun weiterhin ihr Unwesen und
          versetzten die Leute in Angst und Schrecken. Jeder, der das Heulen und
          Bellen vernahm, bekreuzigte sich sofort, um gegen diese teuflischen
          Hunde gefeit zu sein. Es gab einmal einen alten Mann, der sich in
          einer Nacht verirrte und unversehens in einen dunklen Gang der sonst
          von allen gemiedenen Höhle gelangte. Dort versetzten ihn die Hunde in
          Angst und Schrecken. Erst als er das Kreuzzeichen machte, zogen sich
          die schaurigen Hunde in die hinterste Ecke der Höhle zurück. Der Mann
          konnte fliehen und lag daheim während Wochen vom Tode gepeinigt herum.
          Er war von dieser Zeit an ein gebrochener Mann. Eine Bekanntschaft
          ganz anderer Art machte "Rofahans" mit den unheimlichen Geistern
          dieser Burg. Ein weisser Fuchs brachte seine Sinne arg durcheinander.
          Jedenfalls glaubte er, einen weissen Fuchs gesehen zu haben, dem er
          als passionierter Jäger natürlich sofort folgte. Während dieser
          Verfolgungsjagd war er nun - natürlich ohne es zu merken - in die
          Wichensteiner Höhle gelangt. Und schon wurde er von den drei schwarzen
          Hunden angefallen. Er kam kaum dazu, sich zur Wehr zu setzen, als die
          Hunde schon wieder verschwunden waren. Dafür baute sich ein riesiger
          Tisch vor ihm auf. Um den Tisch herum sassen die drei Raubritter Auf
          dem Tisch befand sich eine grosse Schatztruhe. Diese Truhe wiederum
          wurde von einer Kröte bewacht. Die Raubritter forderten den Jäger auf
          die Kröte zu entfernen. Dieser Aufforderung wollte er umso eher
          nachkommen, als ihm gleichzeitig - sofern ihm dies gelingen sollte -
          der ganze Inhalt der Truhe - Gold und Silber in Hülle und Fülle €“ als
          Lohn in Aussicht gestellt wurde. Natürlich war das Entfernen der Kröte
          alles andere als einfach, denn kaum hatte der Jägersmann nach ihr
          gegriffen, wurde das Tier immer grösser und ein "Qualm von Rauch,
          Moder und Schwefelgeruch" verpestete die Luft. In letzter Sekunde
          konnte der Jäger das Weite suchen. Er rannte so schnell und so weit er
          konnte. Hinter sich hörte er die Stimmen der Raubritter, die sich
          beklagten, dass es nun wieder 1'000 Jahre dauern würde, bis sie
          befreit werden könnten.
        </p>
      </div>

      {/* Unsere Burg */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12 px-8">
        <p className="text-center text-sec font-tifont text-3xl sm:text-4xl md:text-6xl mb-8">
          Unsere Burg
        </p>

        <div className="clearfix">
          <img
            src="../assets/bilder/Burg.jpg"
            alt="Unsere Burg"
            className="float-right w-1/2 sm:w-1/2 mr-6 mb-4 rounded-lg shadow-lg"
          />

          <p className="text-ter font-tefont text-lg sm:text-xl md:text-3xl">
            Die Höhlenburg Wichenstein befindet sich in einer mächtigen
            Einwölbung auf der Ostseite des Semelenberges bei Oberriet im
            Rheintal. Vierstöckig war die Burg wohl mal, aber vom Inneren ist
            heute nichts mehr vorhanden. Nur noch ein Teil der Außenmauer, der
            "Schildmauer" steht noch. Wie man der Literatur entnehmen kann, ist
            nur sehr wenig über sie bekannt. In den "Appenzeller Kriegen" sei
            sie zerstört worden. Ansonsten ranken sich halt viele Geschichten
            und Sagen um diesen heute fast einsamen Ort.
          </p>
        </div>
      </div>

      {/* abstand */}
      <div className="w-full sm:w-4/5 md:w-3/5 mx-auto py-12"></div>
    </div>
  );
}
