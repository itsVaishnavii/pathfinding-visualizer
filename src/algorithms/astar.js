export default function astar(grid, startNode, endNode) {
  const openSet = [startNode];
  const visited = [];

  startNode.g = 0;
  startNode.f = heuristic(startNode, endNode);

  while (openSet.length) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();

    if (current.isWall) continue;

    current.isVisited = true;
    visited.push(current);

    if (current === endNode) return visited;

    const neighbors = getUnvisitedNeighbors(current, grid);
    for (const neighbor of neighbors) {
      const tempG = current.g + 1;
      if (tempG < neighbor.g) {
        neighbor.g = tempG;
        neighbor.f = tempG + heuristic(neighbor, endNode);
        neighbor.previousNode = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return visited;
}

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function getUnvisitedNeighbors(node, grid) {
  const { row, col } = node;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((n) => !n.isVisited && !n.isWall);
}
