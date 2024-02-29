/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
function makeEdges(coord) {
  const possibilities = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [2, -1],
    [1, -2],
    [-2, 1],
    [-1, -2],
    [-2, -1],
  ];
  let neighbors = possibilities.map((val) => [coord[0] + val[0], coord[1] + val[1]]);
  // eslint-disable-next-line max-len
  neighbors = neighbors.filter((point) => point[0] >= 0 && point[0] < 8 && point[1] >= 0 && point[1] < 8);
  return neighbors;
}

class Node {
  constructor(value) { // [x, y] coord
    this.value = value;
    // (+-1, +-2), (+-2, +-1)
    this.neighbors = makeEdges(value);
  }
}

function knightMoves(start, end) {
  // dijkstra's algorithm on nodes
  // could probably just do BFS...
  const newNode = new Node(start);
  const queue = [newNode];

  const distances = Array(8).fill().map(() => [...Array(8).fill(Number.MAX_SAFE_INTEGER)]);
  const previous = Array(8).fill().map(() => [...Array(8).fill(-1)]);
  const visited = Array(8).fill().map(() => [...Array(8).fill(false)]);

  distances[start[0]][start[1]] = 0;
  previous[start[0]][start[1]] = null;
  visited[start[0]][start[1]] = true;

  while (queue.length !== 0) {
    const node = queue[queue.length - 1];
    queue.pop();
    // console.log(queue);
    // console.log(`node: ${node.value}\n neighbors: ${node.neighbors}`);
    node.neighbors.forEach((coord) => {
      if (visited[coord[0]][coord[1]] === false) {
        visited[coord[0]][coord[1]] = true;
        distances[coord[0]][coord[1]] = distances[node.value[0]][node.value[1]] + 1;
        previous[coord[0]][coord[1]] = node.value;
        queue.unshift(new Node(coord));
      }
    });
  }

  // printing the shortest route
  let crawl = end;
  const path = [end];
  while (previous[crawl[0]][crawl[1]] !== null) {
    path.unshift(previous[crawl[0]][crawl[1]]);
    crawl = previous[crawl[0]][crawl[1]];
  }
  console.log(`=> You made it in ${path.length} moves! Here's your path:`);
  path.forEach((e) => console.log(e));
}

knightMoves([0, 0], [7, 7]);
