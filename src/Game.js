import React from "react";
import { useState, useEffect } from "react";

export default function Game() {
  const [initalState, setInitialzeState] = useState(intializeBoard());
  const [board, setBoard] = useState(getDeepCopy(initalState));
  const [solution, setSolution] = useState(
    getDeepCopy(solveSoduku(getDeepCopy(initalState)))
  );
  const [timer, setTimer] = useState(new Date().getTime());

  const handleOnChange = (e, row, col) => {
    const val = parseInt(e.target.value) || -1;
    const inputValues = getDeepCopy(board);

    if (val === -1 || (val >= 1 && val <= 9)) {
      inputValues[row][col] = val;
    }

    setBoard(inputValues);
  };

  const handleHint = () => {
    const index = hint(board, solution);
    if (index === -1) return;
    const row = Math.floor(index / 9);
    const col = index % 9;
    const inputValues = getDeepCopy(board);

    inputValues[row][col] = solution[row][col];

    setBoard(inputValues);
  };

  const handleSolve = () => {
    setBoard(getDeepCopy(solution));
  };

  const handleReset = () => {
    setBoard(initalState);
  };

  const handleNextGame = () => {
    if (new Date().getTime() - timer < 2000) {
      alert("Please wait 2 seconds before trying.");
      return;
    }
    const newGame = intializeBoard();
    setInitialzeState(newGame);
    setBoard(getDeepCopy(newGame));
    setSolution(getDeepCopy(solveSoduku(getDeepCopy(newGame))));
    setTimer(new Date().getTime());
  };

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
                        className={
                          board[ridx][cidx] === solution[ridx][cidx] ||
                          board[ridx][cidx] === -1
                            ? "node"
                            : "node node-invalid"
                        }
                        value={
                          board[ridx][cidx] === -1 ? "" : board[ridx][cidx]
                        }
                        onChange={(e) => handleOnChange(e, ridx, cidx)}
                        disabled={board[ridx][cidx] === solution[ridx][cidx]}
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
        <button className="button button-hint" onClick={handleHint}>
          HINT
        </button>
        <button className="button button-solve" onClick={handleSolve}>
          SOLVE
        </button>
        <button className="button button-reset" onClick={handleReset}>
          RESET
        </button>
        <button className="button button-next" onClick={handleNextGame}>
          NEXT
        </button>
      </div>
    </div>
  );
}

// Solve the soduku
const solveSoduku = (board) => {
  const solution = [];
  backtrack(board, 0, solution);
  console.log(solution);
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

// Randomly reveal one of the inputs in the board
// Randomly get a input from the remaining indices
// Reveal it on the board
const hint = (unsolve, solve) => {
  const list = remainIndices(unsolve, solve);
  if (list.length === 0) return -1;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};

const getDeepCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const intializeBoard = () => {
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

  const index = Math.floor(Math.random() * sudokus.length);

  return sudokus[index];
};
