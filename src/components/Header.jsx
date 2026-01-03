import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo_schwarz.svg";
import BiteSound from "../assets/sounds/bite.mp3";
import ZaehneOben from "../assets/bilder/ZaehneOben.png";
import ZaehneGross from "../assets/bilder/ZaehneObenGross.png";

export default function Header({
  animating,
  setAnimating,
  menuOpen,
  setMenuOpen,
}) {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleClick = (path) => {
    if (animating) return;

    setAnimating(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setTimeout(() => {
      navigate(path);
      setAnimating(false);
      setMenuOpen(false);
    }, 700); // ⬅ exakt deine duration-700
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        animating ? "h-[70vh]" : "h-20"
      } bg-qui`}
    >
      <audio ref={audioRef} src={BiteSound} preload="auto" />

      <div className="h-20 flex items-center justify-between px-8 relative z-50">
        {/* Logo */}
        <div className="flex items-center h-full">
          <button
            onClick={() => handleClick("/")}
            className="h-full flex items-center p-1"
          >
            <img
              src={Logo}
              alt="Logo"
              className="h-full w-auto object-contain"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-tefont text-2xl text-pri">
          <button
            onClick={() => handleClick("/")}
            className="hover:text-sec transition"
          >
            Home
          </button>
          <button
            onClick={() => handleClick("/termine")}
            className="hover:text-sec transition bg-ter p-2 text-pri"
          >
            Termine
          </button>
          <button
            onClick={() => handleClick("/verein")}
            className="hover:text-sec transition"
          >
            Verein
          </button>
          <a
            href="https://www.instagram.com/wichastoanerhoellahuend9463/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-tefont text-2xl text-pri hover:text-sec transition-colors duration-300 cursor-pointer flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm4.5-3a1.5 1.5 0 1 0 0 2.999A1.5 1.5 0 0 0 16.5 6z" />
            </svg>
            Aktuelles
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden text-pri z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menü */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col items-center space-y-4 bg-qui py-4 z-50">
          <button
            onClick={() => handleClick("/")}
            className="font-tefont text-2xl text-pri hover:text-sec transition"
          >
            Home
          </button>
          <button
            onClick={() => handleClick("/termine")}
            className="font-tefont text-2xl text-pri hover:text-sec transition"
          >
            Termine
          </button>
          <button
            onClick={() => handleClick("/verein")}
            className="font-tefont text-2xl text-pri hover:text-sec transition"
          >
            Verein
          </button>
        </div>
      )}

      {/* Zähne Mobile */}
      <div
        className="absolute left-0 w-full md:hidden z-40 transition-all duration-700"
        style={{ bottom: animating ? "-30px" : "-70px", height: "80px" }}
      >
        <img
          src={ZaehneOben}
          alt="Zähne"
          className="w-full h-full object-fill"
        />
      </div>

      {/* Zähne Desktop */}
      <div
        className="absolute left-0 w-full hidden md:flex z-40 transition-all duration-700"
        style={{ bottom: "-160px", height: "200px" }}
      >
        <img
          src={ZaehneGross}
          alt="Zähne Desktop"
          className="w-full h-full object-fill"
        />
      </div>
    </header>
  );
}
