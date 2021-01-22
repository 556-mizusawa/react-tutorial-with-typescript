import React, { useState } from 'react';
import Board from './Board';
import '../index.css';
import calculateWinner from './calclateWinner';

const App: React.FC<{}> = () => {
  const [state, dispatch] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const history = state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    dispatch({
      history: history.concat([{ squares: squares }]),
      xIsNext: !state.xIsNext,
    });
  };

  const history = state.history;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${state.xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default App;
