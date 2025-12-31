import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Datenschutz from "./pages/Datenschutz";
import Verein from "./pages/Verein";

export default function App() {
  const [animating, setAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // <-- neu
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-transparent text-qui">
      <Header
        animating={animating}
        onNavigate={handleNavigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen} // <-- weitergeben
      />
      <main className="pt-24 transition-opacity duration-300">
        {currentPage === "home" && <Home />}
        {currentPage === "termine" && <Termine />}
        {currentPage === "verein" && <Verein />}
        {currentPage === "datenschutz" && <Datenschutz />}
      </main>
      <Footer
        animating={animating}
        onNavigate={handleNavigate}
        menuOpen={menuOpen} // <-- Footer weiß jetzt Bescheid
      />
    </div>
  );
}
