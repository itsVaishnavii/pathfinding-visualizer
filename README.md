# 🔍 Pathfinding Algorithm Visualizer

An interactive web-based visualizer built with **React.js**, allowing users to explore how pathfinding algorithms work in real time. This project visually demonstrates algorithms like **BFS**, **DFS**, and **A\*** on a grid, with support for dragging start/end nodes, placing walls, and toggling dark mode.

> ⚡ Designed and developed by [Vaishnavi Singh](https://github.com/itsVaishnavii)

---

## 🌐 Live Demo

**👉 [View it live here](https://itsVaishnavii.github.io/pathfinding-visualizer/)**

---

## 🎯 Features

- ✅ **BFS**, **DFS**, and **A\*** pathfinding algorithms
- 🎯 Visual animation of visited nodes and final path
- 🧱 Click to add/remove walls (obstacles)
- 🟢 Draggable **Start node**
- 🔴 Draggable **End node**
- 🌙 Toggle **Dark mode**
- 🔁 Reset grid and **Clear walls**
- 💡 Fully responsive design

---

## 🖼️ Preview

| Start Screen | Running Algorithm | Final Path |
|-------------|-------------------|-------------|
| ![Start](https://via.placeholder.com/200x100?text=Start+Node) | ![Visited](https://via.placeholder.com/200x100?text=Visited+Nodes) | ![Path](https://via.placeholder.com/200x100?text=Shortest+Path) |

---

## 💻 Tech Stack

| Frontend   | Library       | Deployment   |
|------------|---------------|--------------|
| React.js   | CSS Grid      | GitHub Pages |
| JavaScript | Create React App | npm scripts  |

---

## 🚀 Getting Started (Local Setup)

To run the app locally:

```bash
git clone https://github.com/itsVaishnavii/pathfinding-visualizer.git
cd pathfinding-visualizer
npm install
npm start

## 📌 Algorithms Explained   ← ✅ 

- **BFS (Breadth-First Search)** – Guarantees shortest path in unweighted graphs.
- **DFS (Depth-First Search)** – Explores deep paths first, not always optimal.
- **A\* (A-Star Search)** – Uses heuristic to find shortest path efficiently.

Each algorithm uses a `previousNode` reference to reconstruct the path after visiting.



