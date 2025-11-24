import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import MarkerLayer from "./Marker";
import RoutePolyline from "./RoutePolyline";
import { floorDimensions } from "../../utils/mapConfig";
import { mapToGridCoords, clampGridPoint } from "../../utils/transformCoords";

import groundFloor from "../../assets/final maps/floorplan.png";


const floorImages = {
  "b6e7fc47-40bb-4c22-bfff-8887e418641f": groundFloor,
 
};

// Automatically fit bounds when image changes
const AutoFitImage = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || !bounds) return;
    map.fitBounds(bounds, { padding: [10, 10], animate: false });
  }, [map, bounds]);
  return null;
};

// Handles both double-click (desktop) and double-tap (mobile)
const MapClickHandler = ({ onSelectLocation, currentFloorId }) => {
  const lastTapRef = useRef({ time: 0, latlng: null });
  const DOUBLE_TAP_DELAY = 300;

  useMapEvents({
    click: (e) => {
      const now = Date.now();
      const latlng = e.latlng;

      if (
        lastTapRef.current.latlng &&
        now - lastTapRef.current.time < DOUBLE_TAP_DELAY &&
        Math.abs(latlng.lat - lastTapRef.current.latlng.lat) < 0.0001 &&
        Math.abs(latlng.lng - lastTapRef.current.latlng.lng) < 0.0001
      ) {
        const gridPt = mapToGridCoords({
          lng: latlng.lng,
          lat: latlng.lat,
          floor: currentFloorId,
        });
        onSelectLocation?.(clampGridPoint(gridPt, currentFloorId));
        lastTapRef.current = { time: 0, latlng: null };
      } else {
        lastTapRef.current = { time: now, latlng };
      }
    },
    dblclick: (e) => {
      const gridPt = mapToGridCoords({
        lng: e.latlng.lng,
        lat: e.latlng.lat,
        floor: currentFloorId,
      });
      onSelectLocation?.(clampGridPoint(gridPt, currentFloorId));
    },
  });

  return null;
};

const Map = ({
  userLocation,
  Endnode,
  nodes = [],
  route = [],
  currentFloor,
  onSelectLocation,
  onMarkerClick,
  selectedNodeId,
  highlightedNodeId,
  forceVisibleMarkers = false,
}) => {
  const containerRef = useRef(null);
  const [renderSize, setRenderSize] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  });
//making edits here im bound
  // Load correct floor image + dimensions
  const image = floorImages[currentFloor?.id] || groundFloor;
  const { width, height } =
    floorDimensions[currentFloor?.id] || { width: 2000, height: 3000 };

  // keep correct aspect ratio
  const bounds = useMemo(
    () => [
      [0, 0],
      [height, width], // Leaflet CRS.Simple uses [y, x]
    ],
    [width, height]
  );

  // Measure container for route rendering
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setRenderSize({
      width: rect.width,
      height: rect.height,
      offsetX: 0,
      offsetY: 0,
    });
  }, [currentFloor, route]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-gray-100">
     
      <MapContainer // //the map background like google maps: make changes here//
        crs={L.CRS.Simple}
        bounds={bounds}
        center={[height / 2, width / 2]}
        zoom={-1}
        minZoom={-4}
        maxZoom={5}
        zoomControl={false}
        doubleClickZoom={false}
        style={{
          width: "100%",
          height: "100%",
          background: "offwhite", // helps visualize margins for horizontal maps
        }}
      > 
        <ImageOverlay //probably makes the map to be overlayed
          url={image}
          bounds={bounds}
          preserveAspectRatio="xMidYMid meet" // prevents stretching
        />
        <AutoFitImage bounds={bounds} />
        <ZoomControl position="bottomright" />

        <MapClickHandler
          onSelectLocation={onSelectLocation}
          currentFloorId={currentFloor?.id}
        />

        <MarkerLayer
          nodes={nodes}
          userLocation={userLocation}
          currentFloorId={currentFloor?.id}
          onMarkerClick={onMarkerClick}
          selectedNodeId={selectedNodeId}
          highlightedNodeId={highlightedNodeId}
          forceVisibleMarkers={forceVisibleMarkers}
          destinationNodeId={Endnode}
        />



        {renderSize.width > 0 && renderSize.height > 0 && (
          <RoutePolyline
            route={route}
            currentFloor={currentFloor?.id}
            userLocation={userLocation}
            renderSize={renderSize}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
