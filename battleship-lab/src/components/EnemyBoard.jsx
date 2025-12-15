import React from 'react';

const EnemyBoard = ({ board, setBoard }) => {
  const toggleShot = (r, c) => {
    const newBoard = [...board];
    const row = [...newBoard[r]];
    row[c] = (row[c] + 1) % 3;
    newBoard[r] = row;
    setBoard(newBoard);
  };

  return (
    <div className="glass-panel p-6 rounded-xl shadow-2xl border border-red-900/30">
      <h2 className="text-xl font-bold text-red-400 mb-4 tracking-widest uppercase text-right">Radar Wroga</h2>
      <div className="grid grid-cols-10 gap-1 w-fit mx-auto bg-slate-900 p-2 border border-slate-700 rounded">
        {board.map((row, rIndex) => (
          row.map((cell, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              onClick={() => toggleShot(rIndex, cIndex)}
              className={`w-6 h-6 sm:w-8 sm:h-8 border border-slate-800 cursor-pointer flex items-center justify-center transition-all
                ${cell === 0 ? 'bg-slate-900 hover:bg-slate-800' : ''}
                ${cell === 1 ? 'bg-slate-600' : ''} 
                ${cell === 2 ? 'bg-red-600 shadow-[0_0_15px_red]' : ''} 
              `}
            >
              {cell === 1 && <span className="w-2 h-2 rounded-full bg-slate-400"></span>}
              {cell === 2 && <span className="text-white font-bold text-sm">✕</span>}
            </div>
          ))
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center font-mono">&gt; WYBIERZ CEL ATAKU</p>
    </div>
  );
};

export default EnemyBoard;