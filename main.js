const width = 35;
const height = 30; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  tds.forEach(function (td) {
    const currentCell = gol.getCell(td.dataset.row, td.dataset.col);
    if (currentCell === 1) {
      td.classList.add("alive");
    }

    if (currentCell === 0) {
      td.classList.remove("alive");
    }
  });
};

/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", (event) => {
  gol.toggleCell(event.target.dataset.row, event.target.dataset.col);

  paint();
});

document.getElementById("step_btn").addEventListener("click", (event) => {
  gol.tick();
  paint();
});

let alreadyPlaying = false;
let tickInterval;
let paintInterval;

document.getElementById("play_btn").addEventListener("click", (event) => {
  if (alreadyPlaying === false) {
    // setInterval(gol.tick.bind(gol), 300);
    // setInterval(paint, 300);
    tickInterval = setInterval(gol.tick.bind(gol), 300);
    paintInterval = setInterval(paint, 300);
    alreadyPlaying = true;
  }

  if (alreadyPlaying === true) {
    return;
  }
});

document.getElementById("pause_btn").addEventListener("click", (event) => {
  if (alreadyPlaying === true) {
    alreadyPlaying = false;
    clearInterval(paintInterval);
    clearInterval(tickInterval);
  } else if (alreadyPlaying === false) {
    paintInterval = setInterval(paint, 300);
    tickInterval = setInterval(gol.tick.bind(gol), 300);
    alreadyPlaying = true;
  }
});

document.getElementById("random_btn").addEventListener("click", (event) => {
  // TODO: Randomize the board and paint
});

document.getElementById("clear_btn").addEventListener("click", (event) => {
  tds.forEach((td) => {
    if (td.className === "alive") {
      gol.toggleCell(td.dataset.row, td.dataset.col);
    }
  });
  paint();
  alreadyPlaying = false;
  clearInterval(paintInterval);
  clearInterval(tickInterval);
});
