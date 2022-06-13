import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";

function App() {
  const initalState = intializeBoard();

  const [board, setBoard] = useState(getDeepCopy(initalState));
  const [done, setDone] = useState(false);
  const [process, setProcess] = useState(false);

  const handleOnChange = (e, row, col) => {
    if (process) {
      return;
    }
    const val = parseInt(e.target.value) || -1;
    const inputValues = getDeepCopy(board);

    if (val === -1 || (val >= 1 && val <= 9)) {
      inputValues[row][col] = val;
    }

    if (
      val === -1 ||
      (checkValidRow(inputValues, row, col) &&
        checkValidCol(inputValues, row, col) &&
        checkValidBox(inputValues, row, col))
    ) {
      setBoard(inputValues);
    }
  };

  const handleSolve = () => {
    if (process) {
      return;
    }
    alert("Solving now, sometimes it takes long.");
    if (solveSoduku(board)) {
      setBoard(getDeepCopy(board));
      setDone(true);
    }
  };

  const handleReset = () => {
    if (process) {
      return;
    }
    setBoard(initalState);
    setDone(false);
  };

  const handleNextGame = () => {};

  return (
    <div className="solver">
      <table>
        <tbody>
          {board.map((row, ridx) => {
            return (
              <tr key={ridx} className={(ridx + 1) % 3 === 0 ? "rborder" : ""}>
                {row.map((node, cidx) => {
                  return (
                    <td
                      key={ridx + "" + cidx}
                      className={(cidx + 1) % 3 === 0 ? "cborder" : ""}
                    >
                      <input
                        className="node"
                        value={
                          board[ridx][cidx] === -1 ? "" : board[ridx][cidx]
                        }
                        onChange={(e) => handleOnChange(e, ridx, cidx)}
                        disabled={initalState[ridx][cidx] !== -1 || done}
                      ></input>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttonBar">
        <button className="button button-solve" onClick={handleSolve}>
          SOLVE
        </button>
        <button className="button button-reset" onClick={handleReset}>
          RESET
        </button>
      </div>
    </div>
  );
}

// Solve the soduku
const solveSoduku = (board) => {
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
  if (!dfs(0, board, rowNums, colNums, gridNums, empties)) {
    alert("No solution");
    return false;
  }
  return true;
};

// Initialize arrays
const newArray = (nums) => {
  const ret = [];
  for (let i = 0; i < 9; i++) {
    ret.push(nums);
  }
  return ret;
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

// A helper function for solveSoduku which gets the next spot in the board to solve
const getNextIndex = () => {};

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
// Backtracking function to solve the soduku
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

// Get the remaining input indices
// Returns an array with all the indices
const remainIndices = (unsolve, solve) => {
  const retVal = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (unsolve[i][j] !== solve[i][j]) {
        retVal.push(i * 9 + j);
      }
    }
  }
  return retVal;
};

const getDeepCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const intializeBoard = () => {
  return [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
};

export default App;
