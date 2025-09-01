# 📚 Book Finder (React + Vite)

A simple web application for **Alex** to search books by title using the **Open Library API**.  
This project is built as part of the Take-Home UI Challenge.

---

## 🚀 Live Demo
👉 [Open the app here](https://codesandbox.io/p/sandbox/prgsgw)

---

## ✨ Features
- Search books by **title**
- Shows:
  - Book cover (if available)
  - Title
  - Author(s)
  - First published year
- Sorting options:
  - Relevance (default)
  - Newest year first
- Example search chips (quick demo)
- Responsive design (works on desktop & mobile)
- Handles loading / error / empty states

---

## 🛠️ Tech Stack
- **React (Vite template)**
- **Plain CSS** (custom styles, no framework)
- **Open Library API** (public, no key required)

---

## 📡 API Info
- Search endpoint:  
  `https://openlibrary.org/search.json?title={bookTitle}`

- Cover images:  
  `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`

---

## ▶️ How to Run Locally
1. Clone / download this sandbox.
2. Install dependencies:
   ```bash
   npm install
