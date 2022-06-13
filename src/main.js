const sudokus = [
  [
    [5, 3, -1, -1, 7, -1, -1, -1, -1],
    [6, -1, -1, 1, 9, 5, -1, -1, -1],
    [-1, 9, 8, -1, -1, -1, -1, 6, -1],
    [8, -1, -1, -1, 6, -1, -1, -1, 3],
    [4, -1, -1, 8, -1, 3, -1, -1, 1],
    [7, -1, -1, -1, 2, -1, -1, -1, 6],
    [-1, 6, -1, -1, -1, -1, 2, 8, -1],
    [-1, -1, -1, 4, 1, 9, -1, -1, 5],
    [-1, -1, -1, -1, 8, -1, -1, 7, 9],
  ],
  [
    [-1, 9, -1, -1, -1, -1, -1, 4, -1],
    [-1, 6, 4, 2, -1, 5, 7, 8, -1],
    [-1, -1, 8, -1, 4, -1, 9, -1, -1],
    [4, 8, 3, -1, 6, -1, 2, 5, 1],
    [9, -1, -1, -1, -1, -1, -1, -1, 7],
    [2, 5, 7, -1, 8, -1, 4, 6, 9],
    [-1, -1, 9, -1, 1, -1, 5, -1, -1],
    [-1, 3, 1, 8, -1, 2, 6, 9, -1],
    [-1, 4, -1, -1, -1, -1, -1, 1, -1],
  ],
  [
    [5, 3, -1, -1, 7, -1, -1, -1, -1],
    [6, -1, -1, 1, 9, 5, -1, -1, -1],
    [-1, 9, 8, -1, -1, -1, -1, 6, -1],
    [8, -1, -1, -1, 6, -1, -1, -1, 3],
    [4, -1, -1, 8, -1, 3, -1, -1, 1],
    [7, -1, -1, -1, 2, -1, -1, -1, 6],
    [-1, 6, -1, -1, -1, -1, 2, 8, -1],
    [-1, -1, -1, 4, 1, 9, -1, -1, 5],
    [-1, -1, -1, -1, 8, -1, -1, 7, 9],
  ],
  [
    [-1, 3, -1, 8, 2, 1, -1, 4, -1],
    [-1, 5, 9, -1, 3, -1, 6, 1, -1],
    [-1, -1, 1, -1, -1, -1, 2, -1, -1],
    [-1, -1, 2, -1, -1, -1, 3, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 8, -1, -1, -1, 4, -1, -1],
    [-1, -1, 3, -1, -1, -1, 1, -1, -1],
    [-1, 2, 4, -1, 8, -1, 5, 2, -1],
    [-1, 6, -1, 4, 1, 3, -1, 6, -1],
  ],
  [
    [-1, -1, -1, 8, -1, 2, -1, -1, -1],
    [-1, 4, -1, -1, -1, -1, -1, 5, -1],
    [-1, -1, 2, -1, -1, -1, 3, -1, -1],
    [2, -1, -1, -1, -1, -1, -1, -1, 7],
    [-1, -1, -1, 4, 5, 6, -1, -1, -1],
    [6, -1, -1, -1, -1, -1, -1, -1, 9],
    [-1, -1, 7, -1, -1, -1, 8, -1, -1],
    [-1, 3, -1, -1, -1, -1, -1, 4, -1],
    [-1, -1, -1, 2, -1, 7, -1, -1, -1],
  ],
  [
    [-1, 7, -1, -1, 6, -1, -1, -1, 9],
    [6, -1, -1, 5, -1, -1, -1, 8, -1],
    [-1, -1, 4, -1, -1, -1, 7, -1, -1],
    [-1, 3, -1, -1, -1, 6, -1, -1, -1],
    [2, -1, -1, -1, 5, -1, -1, -1, 8],
    [-1, -1, -1, 4, -1, -1, -1, 1, -1],
    [-1, -1, 3, -1, -1, -1, 4, -1, -1],
    [-1, 2, -1, -1, -1, 7, -1, -1, 3],
    [1, -1, -1, -1, 8, -1, -1, 2, -1],
  ],
  [
    [-1, -1, -1, -1, -1, 2, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, 3],
    [7, -1, 3, 1, -1, 4, -1, -1, -1],
    [-1, 9, -1, -1, -1, 3, -1, 1, -1],
    [-1, -1, -1, -1, 6, -1, 2, -1, -1],
    [3, -1, 4, -1, -1, 8, 9, -1, 5],
    [-1, -1, 9, -1, 8, 1, 7, -1, 4],
    [2, 4, -1, 9, -1, 5, 3, 8, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ],
  [
    [-1, 8, -1, -1, 4, -1, -1, -1, -1],
    [9, -1, -1, -1, -1, -1, 2, -1, -1],
    [-1, -1, -1, -1, 1, -1, -1, -1, -1],
    [1, -1, -1, 5, -1, -1, -1, -1, 8],
    [5, 6, -1, 1, -1, 2, -1, -1, -1],
    [-1, -1, -1, -1, -1, 4, -1, 6, 5],
    [-1, -1, -1, -1, -1, 5, -1, 7, 9],
    [-1, -1, 9, -1, -1, -1, 3, -1, -1],
    [2, -1, 3, 7, -1, -1, -1, 8, -1],
  ],
];

const backtrack = (board, index, solution) => {
  const row = Math.floor(index / 9);
  const col = index % 9;
  if (index === 81) {
    solution.push(board);
    return true;
  }

  if (board[row][col] !== -1) {
    return backtrack(board, index + 1, solution);
  } else {
    for (let i = 1; i < 10; i++) {
      board[row][col] = i;
      if (
        checkValidRow(board, row, col) &&
        checkValidCol(board, row, col) &&
        checkValidBox(board, row, col) &&
        backtrack(board, index + 1, solution)
      ) {
        return true;
      }
    }
  }
  board[row][col] = -1;
  return false;
};

const solveSoduku = (board) => {
  const solution = [];
  backtrack(board, 0, solution);
  return solution[0];
};

// Check the row if input is valid
const checkValidRow = (board, row, col) => {
  for (let i = 0; i < 9; i++) {
    if (i === row) continue;
    if (board[i][col] === board[row][col]) return false;
  }
  return true;
};

// Check the column if input is valid
const checkValidCol = (board, row, col) => {
  for (let i = 0; i < 9; i++) {
    if (i === col) continue;
    if (board[row][i] === board[row][col]) return false;
  }
  return true;
};

// Check the box if input is valid
const checkValidBox = (board, row, col) => {
  const rRatio = Math.floor(row / 3);
  const cRatio = Math.floor(col / 3);
  for (let i = rRatio * 3; i < rRatio * 3 + 3; i++) {
    for (let j = cRatio * 3; j < cRatio * 3 + 3; j++) {
      if (i === row && j === col) continue;
      if (board[i][j] === board[row][col]) return false;
    }
  }
  return true;
};

const solveSodukuTwo = (board) => {
  const empties = [];
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rowNums = newArray(nums);
  const colNums = newArray(nums);
  const gridNums = newArray(nums);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === -1) {
        empties.push([i, j]);
      } else {
        rowNums[i] = rowNums[i].filter((n) => n !== board[i][j]);
        colNums[j] = colNums[j].filter((n) => n !== board[i][j]);
        gridNums[Math.floor(i / 3) * 3 + Math.floor(j / 3)] = gridNums[
          Math.floor(i / 3) * 3 + Math.floor(j / 3)
        ].filter((n) => n !== board[i][j]);
      }
    }
  }
  dfs(0, board, rowNums, colNums, gridNums, empties);
};

const dfs = (index, board, rowNums, colNums, gridNums, empties) => {
  if (index === empties.length) return true;

  const [r, c] = empties[index];
  // intersection between row and col
  const rcint = rowNums[r].filter((rn) => colNums[c].includes(rn));
  // intersection between row and col and box
  const choices = rcint.filter((rc) =>
    gridNums[Math.floor(r / 3) * 3 + Math.floor(c / 3)].includes(rc)
  );

  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    board[r][c] = choice;
    rowNums[r] = rowNums[r].filter((n) => n !== choice);
    colNums[c] = colNums[c].filter((n) => n !== choice);
    gridNums[Math.floor(r / 3) * 3 + Math.floor(c / 3)] = gridNums[
      Math.floor(r / 3) * 3 + Math.floor(c / 3)
    ].filter((n) => n !== choice);

    if (dfs(index + 1, board, rowNums, colNums, gridNums, empties)) return true;

    rowNums[r].push(choice);
    colNums[c].push(choice);
    gridNums[Math.floor(r / 3) * 3 + Math.floor(c / 3)].push(choice);
  }
  board[r][c] = -1;
  return false;
};

const newArray = (nums) => {
  const ret = [];
  for (let i = 0; i < 9; i++) {
    ret.push(nums);
  }
  return ret;
};

const time = new Date().getTime();
for (let i = 0; i < 8; i++) {
  solveSodukuTwo(sudokus[i]);
  console.log(i, new Date().getTime() - time);
}
