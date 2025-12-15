import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const ProfilePage = ({ user }) => {
  const [nickname, setNickname] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.nickname) setNickname(data.nickname);
        if (data.photoURL) setPhotoURL(data.photoURL);
      }
    };
    loadProfile();
  }, [user.uid]);

  const saveProfile = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        nickname: nickname,
        photoURL: photoURL,
        email: user.email,
        updatedAt: new Date()
      });
      setMsg("Profil zaktualizowany!");
      setTimeout(() => setMsg(""), 3000);
    } catch (e) {
      setMsg("Błąd zapisu: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-xl border border-slate-700 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Ustawienia Profilu</h2>
        
        <div className="flex justify-center mb-6">
          <img 
            src={photoURL || "https://via.placeholder.com/150"} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full border-4 border-cyan-500 object-cover shadow-lg"
            onError={(e) => e.target.src = "https://via.placeholder.com/150"} 
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-cyan-500 text-sm font-bold uppercase">Twoje Imię (Nickname)</label>
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-600 focus:border-cyan-500 outline-none mt-1"
            />
          </div>

          <div>
            <label className="text-cyan-500 text-sm font-bold uppercase">Link do zdjęcia (Avatar URL)</label>
            <input 
              type="text" 
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-600 focus:border-cyan-500 outline-none mt-1 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1">Wklej link do obrazka z internetu</p>
          </div>
        </div>

        {msg && <div className="mt-4 text-green-400 text-center font-bold">{msg}</div>}

        <div className="flex gap-4 mt-8">
          <button onClick={() => navigate("/")} className="flex-1 bg-slate-700 text-white py-2 rounded hover:bg-slate-600 transition">
            Wróć
          </button>
          <button onClick={saveProfile} className="flex-1 bg-cyan-600 text-white py-2 rounded hover:bg-cyan-500 transition font-bold shadow-[0_0_15px_rgba(8,145,178,0.5)]">
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;