import React from 'react';

const MyBoard = ({ board, setBoard }) => {
  const MAX_MASTS = 20;
  const currentMasts = board.flat().filter(cell => cell === 1).length;

  const toggleCell = (r, c) => {
    const newBoard = [...board];
    const row = [...newBoard[r]];
    if (row[c] === 0) {
      if (currentMasts < MAX_MASTS) row[c] = 1;
    } else {
      row[c] = 0;
    }
    newBoard[r] = row;
    setBoard(newBoard);
  };

  return (
    <div className="glass-panel p-6 rounded-xl shadow-2xl border border-blue-800">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold text-cyan-400 tracking-widest uppercase">Twoja Flota</h2>
        <span className={`text-sm font-bold px-2 py-1 rounded ${currentMasts === MAX_MASTS ? "bg-green-900 text-green-300" : "bg-blue-900 text-blue-300"}`}>
          STATUS: {currentMasts}/{MAX_MASTS}
        </span>
      </div>
      <div className="grid grid-cols-10 gap-1 w-fit mx-auto bg-blue-900/50 p-2 border border-blue-700 rounded">
        {board.map((row, rIndex) => (
          row.map((cell, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              onClick={() => toggleCell(rIndex, cIndex)}
              className={`w-6 h-6 sm:w-8 sm:h-8 border border-blue-800/50 cursor-pointer flex items-center justify-center transition-all duration-200
                ${cell === 1 ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-800 hover:bg-slate-700'}`}
            />
          ))
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center font-mono">&gt; KLIKNIJ, ABY USTAWIĆ MASZT</p>
    </div>
  );
};

export default MyBoard;