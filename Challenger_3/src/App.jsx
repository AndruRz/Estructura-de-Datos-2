import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import SongPlayer from "./pages/SongPlayer";
import BrowserHistory from "./pages/BrowserHistory";
import "./App.css";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active-song" : ""}`}>
        🎵 Song Player
      </Link>
      <Link to="/browser" className={`nav-link ${location.pathname === "/browser" ? "active-browser" : ""}`}>
        🌐 Browser History
      </Link>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SongPlayer />} />
        <Route path="/browser" element={<BrowserHistory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;