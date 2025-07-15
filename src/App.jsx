import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react"


import { useAuthStore } from "./store/authStore";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CreateGame from "./Pages/CreateGame";
import JoinGame from "./Pages/JoinGame";
import Logout from "./Components/Logout";

import Background from "./Components/Background";
import Lobby from "./Pages/Lobby";
import Play from "./Pages/Play";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  // console.log(location);
  
  const bgPages = ["/signup", "/login", "/create", "/join", "/join", "/lobby", "/", "test"];
  useEffect(()=>{
    checkAuth();
    console.log(authUser);
  }, [checkAuth]);

  // console.log({ authUser });
  
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  return (
    <div>
    {(bgPages.includes(location.pathname) && <Background />)}
      <Routes>
        
        <Route path="/signup" element = { authUser ? <Navigate to="/"/> : <SignUp/> } />
        <Route path="/login" element = { authUser ? <Navigate to="/"/> : <Login/> } />
        <Route path="/create" element = { authUser ? <CreateGame/> : <Navigate to="/login" /> } />
        <Route path="/join" element = { authUser ? <JoinGame/> : <Navigate to="/login" /> } />
        <Route path="/logout" element = { authUser ? <Logout/> : <Navigate to="/" /> } />
        <Route path="/lobby" element = {<Lobby/>} />
        <Route path="/play/:code" element = { <Play/> } />
        <Route path="/" element = { <Home/> }/>

      </Routes>

      <Toaster position="top-center"/>
    </div>
  );
};

export default App
