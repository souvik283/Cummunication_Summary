// import React from 'react'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Homepage from "./pages/Homepage.jsx";

import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import ChannelsPage from "./pages/ChannelsPage.jsx";
import { useProjectStore } from "./store/useProjectStore.js";


const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const {selectedProjectId} = useProjectStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div>
        loading......
      </div>
    );
  }



  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={authUser != null ? <Dashboard /> : <Navigate to={"/"} />}
        />
        <Route path="/channel/:name" element={authUser ? <ChannelsPage /> : <Navigate to={"/"} />}/>
      
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/dashboard"} />}
        />
      <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </div>
  );
};

export default App;
