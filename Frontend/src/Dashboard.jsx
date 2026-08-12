import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

  const navigate = useNavigate();

useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
    }

}, [navigate]);

 return (
    <MyContext.Provider value={providerValues}>

        <div className={`app ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <ChatWindow
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

        </div>

    </MyContext.Provider>
);
}

export default Dashboard;
