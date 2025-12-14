import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth, db, loginWithGoogle, logout } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// komponent 1: edycja swojej planszy
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
                ${cell === 1 
                  ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                  : 'bg-slate-800 hover:bg-slate-700' 
                }`}
            >
            </div>
          ))
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center font-mono">> CLICK TO DEPLOY UNIT</p>
    </div>
  );
};

// komponent 2: plansza przeciwnika
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
      
      <div className="grid grid-cols-10 gap-1 w-fit mx-auto bg-slate-900 p-2 border border-slate-700 rounded relative overflow-hidden">
        {/* Siatka radaru */}
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
              {cell === 1 && <span className="w-2 h-2 rounded-full bg-slate-400"></span>} {/* pudło */}
              {cell === 2 && <span className="text-white font-bold text-sm">✕</span>} {/* trafienie */}
            </div>
          ))
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center font-mono">> TARGET CONFIRMATION REQUIRED</p>
    </div>
  );
};

// strona gry
const GamePage = ({ user }) => {
  const emptyBoard = Array(10).fill().map(() => Array(10).fill(0));
  const [myBoard, setMyBoard] = useState(emptyBoard);
  const [enemyBoard, setEnemyBoard] = useState(emptyBoard);
  const [msg, setMsg] = useState("");

  // wczytywanie danych
  useEffect(() => {
    const loadData = async () => {
      try {
        const docRef = doc(db, "games", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.myBoard) setMyBoard(JSON.parse(data.myBoard));
          if (data.enemyBoard) setEnemyBoard(JSON.parse(data.enemyBoard));
        }
      } catch (e) { console.error(e); }
    };
    loadData();
  }, [user.uid]);

  // zapisywanie danych
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

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-700 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Bitwa Morska</h1>
          <p className="text-slate-400 text-sm font-mono mt-1">logged as: {user.email}</p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
           <button onClick={saveData} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded shadow-[0_0_15px_rgba(8,145,178,0.5)] font-bold transition-all uppercase text-sm tracking-wider">
             Zapisz Dane
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
           O projekcie 
        </Link>
      </div>
    </div>
  );
};

// strona logowania
const LoginPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
    <div className="glass-panel p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-slate-700">
      <div className="w-16 h-16 bg-cyan-500 rounded-full mx-auto mb-6 shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse"></div>
      <h1 className="text-3xl font-bold text-white mb-2 tracking-widest">Bitwa Morska</h1>
      <p className="text-cyan-500 font-mono text-sm mb-8">Panel Logowania</p>
      
      <button onClick={loginWithGoogle} className="w-full bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-cyan-50 shadow-lg transition-all flex items-center justify-center gap-2">
        <span className="text-xl">G</span> Zaloguj przez Google
      </button>
    </div>
  </div>
);

// strona o autorze
const AboutPage = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="glass-panel max-w-2xl w-full p-8 rounded-xl shadow-2xl border-l-4 border-cyan-500">
      <h1 className="text-3xl font-bold text-white mb-6">Informacje o projekcie</h1>
      
      <div className="space-y-6 text-slate-300 font-sans">
        
        <div className="border-b border-slate-700 pb-3">
          <span className="text-lg text-white">Temat 8: Komponenty interfejsu gry Bitwa Morska</span>
        </div>
        
        <div className="border-b border-slate-700 pb-3">
          <span className="text-cyan-500 block text-xs font-bold uppercase tracking-wider mb-1">Autor</span>
          <span className="text-lg text-white">Karina Levosiuk</span>
        </div>
        
        <div>
          <span className="text-cyan-500 block text-xs font-bold uppercase tracking-wider mb-2">Specyfikacja Techniczna</span>
          <div className="text-sm text-slate-400 leading-relaxed">
            <p className="mb-2">
              Aplikacja stanowi klient frontendowy SPA (Single Page Application)
              zbudowany w oparciu o bibliotekę React 18 oraz środowisko Vite.
            </p>
            <p className="mb-2">
              Warstwa wizualna została zaprojektowana przy użyciu frameworka Tailwind CSS, zapewniając pełną responsywność (RWD).
            </p>
            <p>
              Integracja z chmurą Google Firebaseobejmuje:
            </p>
            <ul className="list-disc list-inside mt-1 ml-2 text-slate-500">
              <li>System uwierzytelniania (Firebase Authentication)</li>
              <li>Bazę danych NoSQL do zapisu stanu aplikacji (Cloud Firestore)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-700">
        <Link to="/" className="flex items-center text-cyan-400 hover:text-white transition-colors font-medium text-sm">
          <span className="mr-2">←</span> Powrót do strony głównej
        </Link>
      </div>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-cyan-500 font-mono">INITIALIZING...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={user ? <GamePage user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;