import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="action-buttons">
      <Link to="/search-room" className="btn btn-search-room">
        Search Room
      </Link>
      <Link to="/room-availability" className="btn btn-room-availability">
        Room Availability
      </Link>
    </div>
  );
}
