import { useNavigate } from "react-router-dom";
import ZaehneUnten from "../assets/bilder/ZaehneUnten.png";
import ZaehneGross from "../assets/bilder/ZaehneUntenGross.png";

export default function Footer({ animating, onNavigate, menuOpen }) {
  const navigate = useNavigate();

  const handleClick = (page) => {
    onNavigate(page);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-700`}
      style={{ height: animating ? "70vh" : "4rem" }}
    >
      {/* Hintergrund Footer */}
      <div className="absolute inset-0 bg-qui z-0"></div>

      {/* Footer Zähne Desktop */}
      <div
        className="absolute left-0 w-full hidden md:flex z-40"
        style={{ height: "200px", overflow: "visible" }}
      >
        <img
          src={ZaehneGross}
          alt="Zähne Desktop"
          className="w-full h-full object-fill transition-transform duration-700"
          style={{
            transform: animating
              ? "translateY(-180px)" // nach oben, wenn animiert
              : "translateY(-180px)", // Startposition über dem Footer
          }}
        />
      </div>

      {/* Footer Zähne Mobile */}
      <div
        className="absolute left-0 w-full md:hidden z-20"
        style={{ height: "80px", overflow: "visible" }}
      >
        <img
          src={ZaehneUnten}
          alt="Zähne"
          className="w-full h-full object-fill transition-transform duration-700"
          style={{
            transform: animating ? "translateY(-70px)" : "translateY(-70px)",
          }}
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-50 flex flex-col items-center justify-end h-full font-tefont text-pri">
        {/* Mobile Footer Content */}
        {menuOpen && (
          <div className="md:hidden fixed bottom-0 left-0 w-full bg-qui text-qua flex flex-col items-center justify-center py-4 gap-2 z-50">
            <button
              onClick={() => onNavigate("datenschutz")}
              className="hover:text-sec transition-opacity"
            >
              Datenschutzerklärung
            </button>

            <a
              href="https://www.instagram.com/wichastoanerhoellahuend9463/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sec transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm4.5-3a1.5 1.5 0 1 0 0 2.999A1.5 1.5 0 0 0 16.5 6z" />
              </svg>
            </a>

            <div className="text-xs">
              © {new Date().getFullYear()} Wichastoaner Höllahünd
            </div>
          </div>
        )}

        {/* Desktop Footer Content */}
        <div className="hidden md:flex w-full px-6 pb-4 flex-row items-start justify-between gap-4">
          <button
            onClick={() => handleClick("datenschutz", "/datenschutz")}
            className="opacity-80 hover:text-sec transition-opacity"
          >
            Datenschutzerklärung
          </button>

          <a
            href="https://www.instagram.com/wichastoanerhoellahuend9463/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sec transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm4.5-3a1.5 1.5 0 1 0 0 2.999A1.5 1.5 0 0 0 16.5 6z" />
            </svg>
          </a>

          <div className="text-xs md:text-sm">
            © {new Date().getFullYear()} Wichastoaner Höllahünd
          </div>
        </div>
      </div>
    </div>
  );
}
