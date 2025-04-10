import React, { useState, useEffect } from 'react';
import bfs from '../algorithms/bfs';
import dfs from '../algorithms/dfs';
import astar from '../algorithms/astar';
import './Grid.css';

const NUM_ROWS = 20;
const NUM_COLS = 50;

function Grid() {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: 5, col: 5 });
  const [endNode, setEndNode] = useState({ row: 10, col: 35 });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setGrid(createGrid());
  }, [startNode, endNode]);

  const createNode = (row, col) => ({
    row,
    col,
    isStart: row === startNode.row && col === startNode.col,
    isEnd: row === endNode.row && col === endNode.col,
    isWall: false,
    isVisited: false,
    previousNode: null,
    g: Infinity,
    f: Infinity,
  });

  const createGrid = () => {
    const newGrid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        currentRow.push(createNode(row, col));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    const node = grid[row][col];
    if (node.isStart) {
      setIsDraggingStart(true);
    } else if (node.isEnd) {
      setIsDraggingEnd(true);
    } else {
      toggleWall(row, col);
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;

    if (isDraggingStart) {
      setStartNode({ row, col });
    } else if (isDraggingEnd) {
      setEndNode({ row, col });
    } else {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  const toggleWall = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

  const resetGrid = () => {
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        previousNode: null,
        g: Infinity,
        f: Infinity,
      }))
    );
    setGrid(newGrid);
    document.querySelectorAll('.node').forEach((n) =>
      n.classList.remove('visited', 'shortest-path')
    );
  };

  const clearWalls = () => {
    const newGrid = grid.map((row) =>
      row.map((node) => ({ ...node, isWall: false }))
    );
    setGrid(newGrid);
  };

  const getShortestPath = (endNode) => {
    const path = [];
    let current = endNode;
    while (current && current.previousNode) {
      path.unshift(current);
      current = current.previousNode;
    }
    return path;
  };

  const animateSearch = (visitedNodes) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          const path = getShortestPath(grid[endNode.row][endNode.col]);
          animateShortestPath(path);
        }, 20 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodes[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node visited';
        }
      }, 20 * i);
    }
  };

  const animateShortestPath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node shortest-path';
        }
      }, 40 * i);
    }
  };

  const handleVisualize = () => {
    resetGrid();
    let visitedNodes;
    switch (selectedAlgorithm) {
      case 'bfs':
        visitedNodes = bfs(grid, startNode, endNode);
        break;
      case 'dfs':
        visitedNodes = dfs(grid, startNode, endNode);
        break;
      case 'astar':
        visitedNodes = astar(grid, startNode, endNode);
        break;
      default:
        return;
    }
    animateSearch(visitedNodes);
  };

  return (
    <div className={`grid-container ${darkMode ? 'dark' : ''}`}>
      <div className="controls">
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="astar">A*</option>
        </select>
        <button onClick={handleVisualize}>Visualize</button>
        <button onClick={resetGrid}>Reset Grid</button>
        <button onClick={clearWalls}>Clear Walls</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="grid" onMouseLeave={handleMouseUp}>
        {createGrid().map((row, i) => (
          <div key={i} className="grid-row">
            {row.map((node, j) => {
              const { row, col, isStart, isEnd, isWall } = node;
              const className = isStart
                ? 'node start'
                : isEnd
                ? 'node end'
                : isWall
                ? 'node wall'
                : 'node';
              return (
                <div
                  key={j}
                  id={`node-${row}-${col}`}
                  className={className}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
