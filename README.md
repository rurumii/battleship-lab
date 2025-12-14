# Bitwa Morska 

Aplikacja webowa realizująca temat nr 8: Komponenty do gry w bitwę morską. Projekt pozwala na interaktywne ustawianie statków oraz symulowanie rozgrywki z zapisem stanu w chmurze.

## 🔗 Wersja Live 
[link](https://battleship-l1r080ebw-rurumis-projects.vercel.app)

## 🛠 Technologie
Projekt został zrealizowany w oparciu o nowoczesny stack technologiczny (React SPA):
* **React 18** + **Vite** (Szybki build i HMR)
* **Tailwind CSS** (Stylowanie Utility-first)
* **Firebase Authentication** (Logowanie Google)
* **Cloud Firestore** (Baza danych NoSQL do zapisu stanu gry)

## 📋 Funkcjonalności
1.  **Uwierzytelnianie:** Bezpieczne logowanie za pomocą konta Google.
2.  **Edytor Planszy:** Interaktywny komponent do ustawiania statków (limit 20 masztów).
3.  **Radar Przeciwnika:** Komponent do oznaczania trafień i pudeł na planszy wroga.
4.  **Zapis w Chmurze:** Stan obu plansz jest synchronizowany z bazą Firebase i przywracany po ponownym wejściu.
5.  **RWD:** Pełna responsywność (układ dostosowuje się do telefonów i desktopów).
