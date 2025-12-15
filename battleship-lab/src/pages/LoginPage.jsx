import React, { useState } from 'react';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../firebase';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      setError("Błąd: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black">
      <div className="glass-panel p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-slate-700">
        <div className="w-16 h-16 bg-cyan-600 rounded-full mx-auto mb-6 shadow-lg flex items-center justify-center">
           <span className="text-white text-2xl">⚓</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Bitwa Morska</h1>
        <p className="text-slate-400 text-sm mb-6 font-sans">
          {isRegistering ? "Utwórz nowe konto" : "Zaloguj się do systemu"}
        </p>

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6 text-left">
          <div>
            <label className="text-xs text-cyan-500 font-bold ml-1">EMAIL</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-600 focus:border-cyan-500 outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-cyan-500 font-bold ml-1">HASŁO</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-600 focus:border-cyan-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded font-bold hover:bg-cyan-500 transition shadow-[0_0_15px_rgba(8,145,178,0.3)]">
            {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-900 text-slate-500">LUB</span></div>
        </div>
        
        <button onClick={loginWithGoogle} className="w-full bg-white text-slate-900 px-6 py-3 rounded font-bold hover:bg-slate-200 shadow-lg transition-all flex items-center justify-center gap-2 mb-4">
          <span className="text-xl font-bold text-blue-600">G</span> Kontynuuj z Google
        </button>

        <p className="text-slate-400 text-sm">
          {isRegistering ? "Masz już konto?" : "Nie masz konta?"} 
          <button onClick={() => setIsRegistering(!isRegistering)} className="text-cyan-400 font-bold ml-2 hover:underline">
            {isRegistering ? "Zaloguj się" : "Zarejestruj"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;