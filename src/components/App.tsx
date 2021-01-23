import React, { useState } from 'react';
import Board from './Board';
import '../index.css';
import calculateWinner from './calclateWinner';

const App: React.FC<{}> = () => {
  const [state, dispatch] = useState({
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    dispatch({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step: number) => {
    dispatch({
      history: history.concat(),
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

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
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
