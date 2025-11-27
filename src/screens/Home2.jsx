import React, { useState, useEffect, useCallback } from "react";
import Map from "../components/map/Map";
import SearchBar from "../components/search/SearchBar";
import ResetUserLocation from "../components/common/ResetUserLocation";
import projectSchema from "../data/project-schema.json";
import { distanceSq } from "../utils/math";
import { dijkstra } from "../utils/dijkstra";

const Home = () => {
  const [nodes, setNodes] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [route, setRoute] = useState([]);
  const [userLoc, setUserLoc] = useState(null);
  const [searchMode, setSearchMode] = useState("setLocation");
  const [currentFloor, setCurrentFloor] = useState(null);

  // Initialize nodes
  useEffect(() => {
    const { floors } = projectSchema;
    const mergedNodes = floors.flatMap((f) =>
      f.nodes.map((n) => ({ ...n, floorId: f.id }))
    );
    setNodes(mergedNodes);
    if (floors.length > 0) {
      setCurrentFloor(floors[0]);
    }
  }, []);

  // Find nearest node
  const nearestNode = useCallback(
    (pt) => {
      let best = null,
        bestD = Infinity;
      nodes.forEach((n) => {
        const d = distanceSq(pt.x, pt.y, n.coordinates.x, n.coordinates.y);
        if (d < bestD) {
          best = n;
          bestD = d;
        }
      });
      return best;
    },
    [nodes]
  );

  // Handle map click
  const handleMapClick = (pt) => {
    const nearest = nearestNode(pt);
    if (nearest) {
      setUserLoc({
        ...pt,
        floor: currentFloor?.id || nearest.floorId || nearest.coordinates.floor
      });
      setStartNode(nearest);
      if (searchMode === "setLocation") setSearchMode("search");
    }
  };

  // Set user location
  const handleSetUserLocation = (node) => {
    setUserLoc({
      ...node.coordinates,
      floor: node.floorId || currentFloor?.id
    });
    setStartNode(node);
    setEndNode(null);
    setRoute([]);
    setSearchMode("search");
  };

  // Set destination
  const handleDestSelect = (node) => {
    if (!startNode?.nodeId) return;
    setEndNode(node);
    const path = dijkstra(startNode.nodeId, node.nodeId, nodes);
    
    // Debug the calculated path
    console.log("🔄 CALCULATED PATH:", path);
    if (path && path.length > 0) {
      console.log("📍 PATH COORDINATES:");
      path.forEach((node, index) => {
        console.log(`  ${index}. ${node.name}:`, node.coordinates);
      });
    }
    
    setRoute(path || []);
  };

  // Debug useEffect
  useEffect(() => {
    console.log("🔍 Routing Debug:", {
      nodesCount: nodes.length,
      startNode: startNode?.name,
      startNodeId: startNode?.nodeId,
      endNode: endNode?.name, 
      endNodeId: endNode?.nodeId,
      routeLength: route.length,
      userLoc,
      searchMode,
      currentFloor: currentFloor?.name
    });
  }, [startNode, endNode, route, userLoc, searchMode, nodes, currentFloor]);

  // Route coordinates debug
  useEffect(() => {
    if (route.length > 0) {
      console.log("🔄 Route coordinates sample:", 
        route.slice(0, 3).map(node => node.coordinates)
      );
    }
  }, [route]);

  // Reset function
  const handleResetUserLocation = useCallback(() => {
    setUserLoc(null);
    setStartNode(null);
    setEndNode(null);
    setRoute([]);
    setSearchMode("setLocation");
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 overflow-hidden">
      <div className="z-50">
        <SearchBar
          nodes={nodes}
          mode={searchMode}
          onSetLocation={handleSetUserLocation}
          onSelectNode={handleDestSelect}
        />
      </div>

      <div className="flex-1 relative z-10">
        <Map
          userLocation={userLoc}
          Endnode={endNode?.nodeId}
          onSelectLocation={handleMapClick}
          nodes={nodes}
          route={route}
          currentFloor={currentFloor} // Added this prop
        />
      </div>

      <div className="z-20 relative">
        <ResetUserLocation onReset={handleResetUserLocation} />
      </div>
    </div>
  );
};

export default Home;