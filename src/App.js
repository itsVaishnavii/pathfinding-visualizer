import React from "react";
import Grid from "./components/Grid";

function App() {
  // Trigger BFS visualization using a custom event
  const handleVisualizeBFS = () => {
    window.dispatchEvent(new Event("startBFS"));
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>🔍 Pathfinding Algorithm Visualizer</h1>
      <button
        onClick={handleVisualizeBFS}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Visualize BFS
      </button>

      {/* The main grid component */}
      <Grid />
    </div>
  );
}

export default App;
