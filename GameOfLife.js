class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    let board = [];
    for (let i = 0; i < this.height; i++) {
      let tempBoard = [];
      for (let j = 0; j < this.width; j++) {
        tempBoard.push(0);
      }
      board.push(tempBoard);
    }
    return board;
  }

  getCell(row, col) {
    if (this.board[row] === undefined) {
      return;
    }
    if (this.board[row][col] === undefined) {
      return;
    }
    return this.board[row][col];
  }

  setCell(value, row, col) {
    if (this.getCell(row, col) === undefined) {
      return;
    }
    this.board[row].splice([col], 1, value);
  }

  toggleCell(row, col) {
    //find cell, switch from 0 -> 1, or vice versa
    let cell = this.getCell(row, col);

    if (cell === 0) {
      this.setCell(1, row, col);
    } else if (cell === 1) {
      this.setCell(0, row, col);
    }
  }

  livingNeighbors(row, col) {
    let neighborsArr = [];

    //get row above for living neighbors
    if (this.board[row - 1] !== undefined) {
      let sliceRow = row - 1;
      let sliceColStart;
      let sliceColEnd;

      //set start point on the splice based on if the column before exists
      if (this.board[row - 1][col - 1] !== undefined) {
        sliceColStart = col - 1;
      } else {
        sliceColStart = col;
      }

      //set end point of the splice based on if the column after exists
      if (this.board[row - 1][col + 1] !== undefined) {
        sliceColEnd = col + 2;
      } else {
        sliceColEnd = col + 1;
      }

      let rowAbove = this.board[sliceRow].slice(sliceColStart, sliceColEnd);
      neighborsArr.push(rowAbove.reduce((a, b) => a + b));
    }

    //get current row columns
    if (this.board[row] !== undefined) {
      let sliceColStart;
      let sliceColEnd;
      let spliceStart = 1;

      if (this.board[row][col - 1] !== undefined) {
        sliceColStart = col - 1;
      } else {
        sliceColStart = col;
        spliceStart = 0;
      }

      if (this.board[row][col + 1] !== undefined) {
        sliceColEnd = col + 2;
      } else {
        sliceColEnd = col + 2;
      }

      let currentRow = this.board[row].slice(sliceColStart, sliceColEnd);

      currentRow.splice(spliceStart, 1);

      neighborsArr.push(currentRow.reduce((a, b) => a + b));
    }

    //get row below neighbors
    if (this.board[row + 1] !== undefined) {
      let sliceRow = row + 1;
      let sliceColStart = col;
      let sliceColEnd = col + 1;

      if (this.board[row + 1][col - 1] !== undefined) {
        sliceColStart = col - 1;
      }

      if (this.board[row + 1][col + 1] !== undefined) {
        sliceColEnd = col + 2;
      }

      let rowBelow = this.board[sliceRow].slice(sliceColStart, sliceColEnd);

      neighborsArr.push(rowBelow.reduce((a, b) => a + b));
    }

    return neighborsArr.reduce((a, b) => a + b);
  }

  tick() {
    const newBoard = this.makeBoard();

    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        let currentCell = this.getCell(row, col);
        let liveNeighbors = this.livingNeighbors(row, col);

        if ((liveNeighbors < 2 || liveNeighbors > 3) && currentCell === 1) {
          newBoard[row][col] = 0;
        } else if (
          (liveNeighbors === 3 && currentCell === 0) ||
          (liveNeighbors > 1 && liveNeighbors < 4 && currentCell === 1)
        ) {
          newBoard[row][col] = 1;
        }
      }
    }
    this.board = newBoard;
  }
}
