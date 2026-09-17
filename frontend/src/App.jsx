// import React from 'react'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Homepage from "./pages/Homepage.jsx";
// import Project from "./pages/Project.jsx";
// import Chat from "./pages/Chat.jsx";
// import Tasks from "./pages/Tasks.jsx";
// import Settings from "./pages/Settings.jsx";
// import { useAuth } from "./context/AuthContext.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import ChannelsPage from "./pages/ChannelsPage.jsx";
import { useProjectStore } from "./store/useProjectStore.js";

// function AppShell({ children }) {
//   const navigate = useNavigate()
//   return (
//     <div className="flex min-h-screen bg-paper">
//       <Sidebar onNewProject={() => navigate('/?new=true')} />
//       <main className="flex flex-1 flex-col">{children}</main>
//     </div>
//   )
// }

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const {selectedProjectId} = useProjectStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div>
        
      </div>
    );
  }

  // const { user } = useAuth()

  // if (!user) {
  //   return (
  //     <Routes>
  //       <Route path="*" element={<Login />} />
  //     </Routes>
  //   )
  // }

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to={"/"} />}
        />
        <Route path="/channel/:name" element={authUser ? <ChannelsPage /> : <Navigate to={"/"} />}/>
        {/* <Route path="/projects/:projectId/chat" element={<Chat />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/settings" element={<Settings />} /> */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/dashboard"} />}
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </div>
  );
};

export default App;
