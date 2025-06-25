import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const navItemStyle = (path) =>
    `px-4 py-2 rounded-xl transition ${
      pathname === path
        ? "bg-blush text-white"
        : "text-pink-700 dark:text-pink-200 hover:bg-softPink dark:hover:bg-darkCard"
    }`;

  return (
    <header className="bg-white dark:bg-darkCard shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-pink-700 dark:text-pink-200">📚 My Kindle</h1>
        <div className="flex items-center space-x-4">
          <Link to="/" className={navItemStyle("/")}>Bookshelf</Link>
          <Link to="/upload" className={navItemStyle("/upload")}>Upload</Link>
          <button
            onClick={toggleDarkMode}
            className="bg-blush text-white px-3 py-1 rounded-xl hover:opacity-90 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
