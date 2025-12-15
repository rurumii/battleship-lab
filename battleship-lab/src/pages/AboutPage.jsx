import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="text-sm text-slate-400 leading-relaxed space-y-3">
  <p>
    Aplikacja typu Single Page Application (SPA) zrealizowana w architekturze komponentowej przy użyciu biblioteki React 18. 
  </p>
  <p>
    Za warstwę wizualną oraz responsywność (RWD) odpowiada framework Tailwind CSS. 
    Nawigacja wewnątrz aplikacji obsługiwana jest przez React Router v6.
  </p>
  <p>
    Warstwa serwerowa (Backend-as-a-Service) oparta jest na chmurze Google Firebase, która zapewnia:
  </p>
  <ul className="list-disc list-inside pl-2 text-slate-500">
    <li>Bezpieczną autoryzację i zarządzanie sesją użytkownika (Authentication).</li>
    <li>Nierelacyjną bazę danych czasu rzeczywistego (Cloud Firestore).</li>
  </ul>
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

export default AboutPage;