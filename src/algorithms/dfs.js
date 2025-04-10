export default function dfs(grid, startNode, endNode) {
  const visited = [];
  const stack = [startNode];
  startNode.isVisited = true;

  while (stack.length) {
    const current = stack.pop();
    visited.push(current);

    if (current === endNode) return visited;

    const neighbors = getUnvisitedNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = current;
        stack.push(neighbor);
      }
    }
  }

  return visited;
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
