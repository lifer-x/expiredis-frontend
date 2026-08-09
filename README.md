# ExpiredIs — Frontend 💻

The client-side application for ExpiredIs — a web service designed for effortless product expiration date tracking. Built as a responsive Single Page Application (SPA), it provides a smooth experience across both mobile and desktop devices.

🌐 **Live Demo:** [https://expiredis.qzz.io](https://expiredis.qzz.io)

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** React (Component-based architecture & Hooks)
* **Build Tool:** Vite (For blazing-fast compilation and Hot Module Replacement)
* **Routing:** React Router (Client-side navigation without page reloads)
* **Localization:** JSON-based translation dictionaries for multi-language support
* **Package Manager:** npm
* **CI/CD:** GitHub Actions (Automated build and deployment workflow)

---

## 📂 Project Structure

* `public/` — Static assets (untouched by the Vite bundler).
  * `robots.txt` — Search engine crawler configuration.
  * `*.png, *.jpg, *.svg` — UI icons and graphical assets.
* `src/` — Application source code.
  * `/components/` — Reusable React components (forms, lists, product cards).
  * `api.js` — Isolated API layer handling HTTP requests to the backend server.
  * `app.css` — Global stylesheets and layout styling.
  * `app.jsx` — Core component managing main layouts and routing paths.
  * `main.jsx` — Entry point mounting the React app into the DOM.
  * `translations.json` — Localization dictionary files.

---

## 🚀 Getting Started (Development)

### 1. Install Dependencies
Clone the repository and install all required local packages:
```bash
npm install
```

### 2. Run Local Development Server
Spin up the Vite local dev environment:
```bash
npm run dev
```
The application will be accessible in your browser at: `http://localhost:5173`

### 3. Build & Deployment
To test the optimized production bundle locally, run:
```bash
npm run build
```
*Note: Manual deployment of the `dist` folder is completely automated. A **GitHub Actions** CI/CD workflow is fully configured for this repository. Every push to the `main` branch triggers an automated build and updates the live site instantly.*
