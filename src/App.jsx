import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Verein from "./pages/Verein";
import Datenschutz from "./pages/Datenschutz";

export default function App() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-qui">
      <Header
        animating={animating}
        setAnimating={setAnimating}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="pt-24 transition-opacity duration-300">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="termine" element={<Termine />} />
          <Route path="verein" element={<Verein />} />
          <Route path="datenschutz" element={<Datenschutz />} />
        </Routes>
      </main>

      <Footer
        animating={animating}
        setAnimating={setAnimating} // sehr wichtig!
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </div>
  );
}
