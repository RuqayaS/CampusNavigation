import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../App.css";
import Header from "../components/Header";
import { rooms } from "../data/rooms";
import { corners, getDays } from "../data/data";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function RoomAvailability() {
  const [selectedBuilding, setSelectedBuilding] = useState("ALL");
  const [searchTime, setSearchTime] = useState("");
  const [searchDay, setSearchDay] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // NEW: For mobile swipe schedule
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const touchStartX = useRef(0);

  // Refs for GSAP animations
  const pageTitleRef = useRef(null);
  const pageSubtitleRef = useRef(null);
  const statsRef = useRef([]);
  const filtersRef = useRef(null);
  const roomCardsRef = useRef([]);

  // Prevent body scroll when modal is open & animate modal
  useEffect(() => {
    if (selectedRoom) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Reset to first slide on open
      setCurrentDayIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedRoom]);

  // Keyboard navigation - ESC to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && selectedRoom) {
        setSelectedRoom(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectedRoom]);

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      pageTitleRef.current,
      { opacity: 0, y: -50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      pageSubtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.5)",
      }
    );

    gsap.fromTo(
      filtersRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.8, ease: "power2.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Current date/time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay();

  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
  const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  // Room Checks
  const isRoomFreeNow = (room) => {
    const todayKey = dayNames[currentDay];
    if (!room[todayKey] || currentDay > 4) return false;

    const currentTimeMinutes = currentHour * 60 + currentMinute;

    const slot = room[todayKey].find((slot) => {
      const startTime = slot.timeStart.hour * 60 + slot.timeStart.minute;
      const endTime = slot.timeEnd.hour * 60 + slot.timeEnd.minute;
      return (
        currentTimeMinutes >= startTime &&
        currentTimeMinutes < endTime &&
        slot.courseName === "Free"
      );
    });

    return slot !== undefined;
  };

  const getNextAvailableTime = (room) => {
    const todayKey = dayNames[currentDay];
    if (!room[todayKey] || currentDay > 4) return null;

    const nowMin = currentHour * 60 + currentMinute;

    const next = room[todayKey].find((slot) => {
      const startTime = slot.timeStart.hour * 60 + slot.timeStart.minute;
      return startTime > nowMin && slot.courseName === "Free";
    });

    if (!next) return null;

    return `${next.timeStart.hour}:${String(next.timeStart.minute).padStart(
      2,
      "0"
    )} - ${next.timeEnd.hour}:${String(next.timeEnd.minute).padStart(2, "0")}`;
  };

  const isRoomFreeAtTime = (room, day, hour, minute) => {
    const dayKey = dayNames[day];
    if (!room[dayKey]) return false;

    const t = hour * 60 + minute;

    const slot = room[dayKey].find((slot) => {
      const start = slot.timeStart.hour * 60 + slot.timeStart.minute;
      const end = slot.timeEnd.hour * 60 + slot.timeEnd.minute;

      return t >= start && t < end && slot.courseName === "Free";
    });

    return slot !== undefined;
  };

  // Filtering Rooms
  const filteredRooms = useMemo(() => {
    let filtered = Object.values(rooms);

    if (selectedBuilding !== "ALL") {
      filtered = filtered.filter((room) =>
        room.name.startsWith(selectedBuilding)
      );
    }

    if (searchTime && searchDay) {
      const [h, m] = searchTime.split(":").map(Number);
      const d = parseInt(searchDay);
      filtered = filtered.filter((room) => isRoomFreeAtTime(room, d, h, m));
    }

    if (showAvailableOnly) {
      filtered = filtered.filter((room) => isRoomFreeNow(room));
    }

    return filtered.slice(0, 20);
  }, [selectedBuilding, searchDay, searchTime, showAvailableOnly]);

  // Card animations
  useEffect(() => {
    const cards = roomCardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [filteredRooms]);

  const availableNowCount = Object.values(rooms).filter((room) =>
    isRoomFreeNow(room)
  ).length;

  // NEW: Swipe gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50 && currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (
      diff < -50 &&
      currentDayIndex < getDays(selectedRoom).length - 1
    ) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  return (
    <div className="room-availability-page">
      <Header />

      <div className="availability-content">
        <div className="page-header">
          <h1 className="page-title" ref={pageTitleRef}>
            Find Your Perfect Room
          </h1>
          <p className="page-subtitle" ref={pageSubtitleRef}>
            Search across {Object.keys(rooms).length} rooms in real-time
          </p>
        </div>

        {/* Stats */}
        <div className="availability-stats">
          <div
            className="stat-card available-stat"
            ref={(el) => (statsRef.current[0] = el)}
          >
            <div className="stat-icon">🟢</div>
            <div className="stat-info">
              <h3>{availableNowCount}</h3>
              <p>Available Now</p>
            </div>
          </div>

          <div
            className="stat-card total-stat"
            ref={(el) => (statsRef.current[1] = el)}
          >
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <h3>{Object.keys(rooms).length}</h3>
              <p>Total Rooms</p>
            </div>
          </div>

          <div
            className="stat-card results-stat"
            ref={(el) => (statsRef.current[2] = el)}
          >
            <div className="stat-icon">🔍</div>
            <div className="stat-info">
              <h3>{filteredRooms.length}</h3>
              <p>Search Results</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="search-filters-modern" ref={filtersRef}>
          {/* Building Filter */}
          <div className="filter-section">
            <h3 className="filter-title">📍 Filter by Building</h3>
            <div className="building-buttons-modern">
              <button
                className={`building-btn-modern ${
                  selectedBuilding === "ALL" ? "active" : ""
                }`}
                onClick={() => setSelectedBuilding("ALL")}
              >
                All Buildings
              </button>

              {corners.map((corner) => (
                <button
                  key={corner.name}
                  className={`building-btn-modern ${corner.color} ${
                    selectedBuilding === corner.name[0] ? "active" : ""
                  }`}
                  onClick={() => setSelectedBuilding(corner.name[0])}
                >
                  {corner.name}
                </button>
              ))}
            </div>
          </div>

          {/* Time Search */}
          <div className="filter-section">
            <h3 className="filter-title">🕐 Search by Time</h3>
            <div className="time-search-modern">
              <select
                className="modern-select"
                value={searchDay}
                onChange={(e) => setSearchDay(e.target.value)}
              >
                <option value="">Select Day</option>
                {dayLabels.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>

              <input
                className="modern-time-input"
                type="time"
                value={searchTime}
                onChange={(e) => setSearchTime(e.target.value)}
              />

              <button
                className="clear-btn-modern"
                onClick={() => {
                  setSearchDay("");
                  setSearchTime("");
                }}
              >
                ✕ Clear
              </button>
            </div>
          </div>

          {/* Available Now Toggle */}
          <div className="filter-section toggle-section">
            <label className="modern-toggle">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={(e) => setShowAvailableOnly(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Show only available now</span>
            </label>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="rooms-grid-modern">
          {filteredRooms.map((room, index) => {
            let isFree, displayText;

            if (searchDay && searchTime) {
              const [h, m] = searchTime.split(":").map(Number);
              const di = parseInt(searchDay);
              const dayName = dayLabels[di];

              isFree = isRoomFreeAtTime(room, di, h, m);

              displayText = isFree
                ? `Available on ${dayName} at ${searchTime}`
                : `Occupied on ${dayName} at ${searchTime}`;
            } else {
              isFree = isRoomFreeNow(room);
              const next = getNextAvailableTime(room);

              displayText = isFree
                ? "Available right now!"
                : next
                ? `Next available: ${next}`
                : "No more slots today";
            }

            return (
              <div
                key={room.name}
                ref={(el) => (roomCardsRef.current[index] = el)}
                className={`room-card-modern ${
                  isFree ? "available-modern" : "unavailable-modern"
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="room-card-header">
                  <div className="room-name-section">
                    <div
                      className={`status-dot ${
                        isFree ? "dot-free" : "dot-busy"
                      }`}
                    ></div>
                    <h2 className="room-name">{room.name}</h2>
                  </div>
                  <span
                    className={`status-badge-modern ${
                      isFree ? "badge-free" : "badge-busy"
                    }`}
                  >
                    {isFree ? "Available" : "Occupied"}
                  </span>
                </div>

                <div className="room-card-body">
                  <p
                    className={`status-message ${
                      isFree ? "message-free" : "message-busy"
                    }`}
                  >
                    {isFree ? "✓ " : "⏱️ "}
                    {displayText}
                  </p>
                </div>

                <div className="room-card-footer">
                  <button className="view-schedule-btn-modern">
                    <span>View Schedule</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="no-results-modern">
            <div className="no-results-icon">🔍</div>
            <h3>No rooms found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* ROOM SCHEDULE MODAL */}
      {selectedRoom && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRoom(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedRoom(null)}
              aria-label="Close schedule modal"
            >
              ×
            </button>

            <h2 id="modal-title">{selectedRoom.name} – Weekly Schedule</h2>

            {/* --- MOBILE SWIPE CAROUSEL + DESKTOP GRID --- */}

            <div className="schedule-container">
              {/* Pagination Dots */}
              <div className="pagination-dots">
                {getDays(selectedRoom).map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentDayIndex ? "active" : ""}`}
                    onClick={() => setCurrentDayIndex(i)}
                  ></span>
                ))}
              </div>

              {/* Swipeable carousel */}
              <div
                className="schedule-carousel"
                style={{
                  transform: `translateX(-${currentDayIndex * 100}%)`,
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {getDays(selectedRoom).map(({ day, timeSlots }, i) => (
                  <div key={i} className="day-slide">
                    <h3>{day}</h3>

                    {timeSlots && timeSlots.length > 0 ? (
                      <div className="time-slots">
                        {timeSlots.map((slot, idx) => (
                          <div
                            key={idx}
                            className={`time-slot ${
                              slot.courseName === "Free"
                                ? "free-slot"
                                : "busy-slot"
                            }`}
                          >
                            <span className="time">
                              {slot.timeStart.hour}:
                              {String(slot.timeStart.minute).padStart(2, "0")} -{" "}
                              {slot.timeEnd.hour}:
                              {String(slot.timeEnd.minute).padStart(2, "0")}
                            </span>

                            <span className="course">{slot.courseName}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-schedule">No schedule</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
