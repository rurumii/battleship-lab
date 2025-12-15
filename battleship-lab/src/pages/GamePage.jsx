import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, logout } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import MyBoard from '../components/MyBoard';
import EnemyBoard from '../components/EnemyBoard';

const GamePage = ({ user }) => {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill(0));
  const [myBoard, setMyBoard] = useState(emptyBoard);
  const [enemyBoard, setEnemyBoard] = useState(emptyBoard);
  const [msg, setMsg] = useState("");
  const [customProfile, setCustomProfile] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const gameSnap = await getDoc(doc(db, "games", user.uid));
        if (gameSnap.exists()) {
          const data = gameSnap.data();
          if (data.myBoard) setMyBoard(JSON.parse(data.myBoard));
          if (data.enemyBoard) setEnemyBoard(JSON.parse(data.enemyBoard));
        }
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) {
          setCustomProfile(userSnap.data());
        }
      } catch (e) { console.error(e); }
    };
    loadData();
  }, [user.uid]);

  const saveData = async () => {
    try {
      await setDoc(doc(db, "games", user.uid), {
        myBoard: JSON.stringify(myBoard),
        enemyBoard: JSON.stringify(enemyBoard),
        lastSaved: new Date()
      });
      setMsg("STAN GRY ZAPISANY DO BAZY");
      setTimeout(() => setMsg(""), 3000);
    } catch (e) {
      setMsg("BŁĄD ZAPISU SYSTEMU");
    }
  };

  const displayName = customProfile?.nickname || user.displayName || user.email;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-700 pb-6">
        <div className="flex items-center gap-4">
          <img 
            src={customProfile?.photoURL || "https://via.placeholder.com/150"} 
            alt="Avatar" 
            className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
            onError={(e) => e.target.src = "https://via.placeholder.com/150"}
          />
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Bitwa Morska</h1>
            <p className="text-slate-400 text-sm font-mono mt-1">{displayName}</p>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
           <Link to="/profile" className="border border-slate-500 text-slate-300 px-4 py-2 rounded hover:bg-slate-800 transition uppercase text-sm font-bold flex items-center">
             Edytuj Profil
           </Link>
           <button onClick={saveData} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(8,145,178,0.5)] font-bold transition-all uppercase text-sm tracking-wider">
             Zapisz
           </button>
           <button onClick={logout} className="border border-red-500 text-red-400 px-6 py-2 rounded hover:bg-red-500/10 transition-all uppercase text-sm tracking-wider">
             Wyloguj
           </button>
        </div>
      </div>

      {msg && (
        <div className="mb-6 p-3 bg-green-900/50 border border-green-500 text-green-300 text-center font-mono rounded animate-pulse">
          [{msg}]
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <MyBoard board={myBoard} setBoard={setMyBoard} />
        <EnemyBoard board={enemyBoard} setBoard={setEnemyBoard} />
      </div>

      <div className="mt-12 text-center border-t border-slate-800 pt-6">
        <Link to="/about" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-mono">
          [ O Projekcie ]
        </Link>
      </div>
    </div>
  );
};

export default GamePage;