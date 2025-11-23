import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="logo">
        <a
          href="https://gdg.community.dev/gdg-on-campus-al-yamamah-university-riyadh-saudi-arabia/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GDG on Campus - Al Yamamah University"
        >
          <img src="/thelogo3.png" alt="Campus Logo" className="logo-image" />
        </a>
      </div>
      <nav className="nav-menu">
        <Link
          to="/"
          className={`nav-link ${isActive("/") ? "active" : ""}`}
          aria-label="Home"
        >
          <svg
            className="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </Link>

        <Link
          to="/search-room"
          className={`nav-link ${isActive("/search-room") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="20"
            height="20"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
          <span>Search Room</span>
        </Link>

        <Link
          to="/room-availability"
          className={`nav-link ${
            isActive("/room-availability") ? "active" : ""
          }`}
        >
          <svg
            className="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="20"
            height="20"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Room Availability</span>
        </Link>
      </nav>
    </header>
  );
}
