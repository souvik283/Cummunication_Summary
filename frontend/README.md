# Pulse — Project status, from the conversation

A React + Tailwind frontend for a project management tool where managers create projects, add employees, and get AI-generated status summaries pulled straight from each project's chat thread.

## Stack
- React 18 + React Router 6
- Tailwind CSS
- lucide-react icons
- Mock API/socket layer in `src/services` (seeded, in-memory data — swap for real endpoints)

## Getting started
```bash
npm install
npm run dev
```
Then open the printed local URL. Sign in with any of the quick demo users on the login screen (one manager, four employees) — no real backend is required, everything runs on mock data.

## Structure
```
src/
├── components/   Navbar, Sidebar, ChatBox, Message, TaskCard, NotificationCard, SummaryCard
├── pages/        Login, Dashboard, Project, Chat, Tasks, Settings
├── services/     api.js (mock REST calls), socket.js (mock realtime socket)
├── context/      AuthContext, ProjectContext
├── App.jsx
├── main.jsx
└── index.css
```

## Notes for wiring up a real backend
- `src/services/api.js` — every export returns a Promise already; replace the bodies with `fetch()`/`axios` calls to your API.
- `src/services/socket.js` — swap `MockSocket` for a real `socket.io-client` instance; the `on/off/emit/connect/disconnect` interface is kept identical so call sites don't change.
- `summarizeProject(projectId)` is where the AI summarization call belongs — point it at your summarization endpoint (e.g. one that sends recent messages to an LLM and returns `{ headline, risk, points, generatedAt }`).
