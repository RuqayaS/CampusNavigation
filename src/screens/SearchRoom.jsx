import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../App.css";
import Header from "../components/Header";
import { room_locations } from "../data/data";

export default function SearchRoom() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchFormRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      searchFormRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.5)" }
    );
  }, []);

  // Live search as you type (≥ 4 characters)
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (query.length < 3) {
      setSearchResults([]);
      setSearchClicked(false);
      return;
    }

    const results = room_locations.filter((room) => {
      return (
        (room.instructorName &&
          room.instructorName.toLowerCase().includes(query)) ||
        room.roomNumber.toLowerCase().includes(query) ||
        room.building.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query) ||
        room.nearestLandmark.toLowerCase().includes(query)
      );
    });

    setSearchResults(results);
  }, [searchQuery]);

  // Animate search results
  useEffect(() => {
    if (searchResults.length > 0) {
      gsap.fromTo(
        ".room-result-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [searchResults]);

  // Search button click handler (works for any query length)
  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchClicked(true);

    const query = searchQuery.toLowerCase().trim();

    const results = room_locations.filter((room) => {
      return (
        (room.instructorName &&
          room.instructorName.toLowerCase().includes(query)) ||
        room.roomNumber.toLowerCase().includes(query) ||
        room.building.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query) ||
        room.nearestLandmark.toLowerCase().includes(query)
      );
    });

    setSearchResults(results);
  };

  return (
    <div className="search-room-page">
      <Header />

      {/* Search Section */}
      <section className="search-section">
        <div className="search-hero">
          <h1 ref={titleRef}>Finding a Room?</h1>
          <p ref={subtitleRef}>
            Search for classrooms or instructor offices by name, room number, or
            building
          </p>

          <form
            className="search-form"
            ref={searchFormRef}
            onSubmit={handleSearchClick}
          >
            <input
              type="text"
              placeholder="Search for instructor, room number, or building..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="results-grid">
            {searchResults.map((room) => (
              <div
                key={room.id}
                className="room-result-card"
                onClick={() => setSelectedRoom(room)}
              >
                <h3>
                  {room.type === "instructor"
                    ? room.instructorName
                    : `${
                        room.type.charAt(0).toUpperCase() + room.type.slice(1)
                      } ${room.roomNumber}`}
                </h3>

                <p>
                  <strong>Building:</strong> {room.building}
                </p>
                <p>
                  <strong>Room:</strong> {room.roomNumber}
                </p>
                <p>
                  <strong>Floor:</strong> {room.floor}
                </p>
                <p>
                  <strong>Landmark:</strong> {room.nearestLandmark}
                </p>

                {room.type === "instructor" && (
                  <p>
                    <strong>Office Hours:</strong> {room.officeHours}
                  </p>
                )}

                <p>
                  <strong>Directions:</strong> {room.directions}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {searchClicked && searchResults.length === 0 && (
        <div className="no-results">
          <p>No rooms found matching "{searchQuery}"</p>
        </div>
      )}

      {/* Selected Room Details */}
      {selectedRoom && (
        <div className="building-details-card">
          <button
            className="close-button"
            onClick={() => setSelectedRoom(null)}
          >
            ×
          </button>

          <h2>
            {selectedRoom.type === "instructor"
              ? selectedRoom.instructorName
              : `${
                  selectedRoom.type.charAt(0).toUpperCase() +
                  selectedRoom.type.slice(1)
                } ${selectedRoom.roomNumber}`}
          </h2>

          <div className="details">
            <p>
              <strong>Building:</strong> {selectedRoom.building}
            </p>
            <p>
              <strong>Floor:</strong> {selectedRoom.floor}
            </p>
            <p>
              <strong>Room Number:</strong> {selectedRoom.roomNumber}
            </p>

            {selectedRoom.type === "instructor" && (
              <p>
                <strong>Office Hours:</strong> {selectedRoom.officeHours}
              </p>
            )}

            <p>
              <strong>Nearest Landmark:</strong> {selectedRoom.nearestLandmark}
            </p>
            <p>
              <strong>Directions:</strong> {selectedRoom.directions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
