import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";
import { API_URL } from "./config";
import favicon from "./assets/favicon.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThreads = async () => {
    try {

        const token = localStorage.getItem("token");

       const response = await fetch(`${API_URL}/api/thread`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const res = await response.json();

        const filteredData = res.map(thread => ({
            threadId: thread.threadId,
            title: thread.title
        }));

        setAllThreads(filteredData);

    } catch (err) {
        console.log(err);
    }
};

    useEffect(() => {
        getAllThreads();
    }, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const token = localStorage.getItem("token");

const response = await fetch(`${API_URL}/api/thread/${newThreadId}`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    const deleteThread = async (threadId) => {
        try {
            const token = localStorage.getItem("token");

    const response = await fetch(
    `${API_URL}/api/thread/${threadId}`,
    {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
);
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log(err);
        }
    }

    

    return (
        
    <section className="sidebar">

        {/* Brand */}

        <div className="sidebarTop">

            <div className="brand">

                <img
    src={favicon}
    alt="Vyora AI"
    className="brandLogo"
/>
                <div>

                    <h2>Vyora AI</h2>

                    <p>Intelligent Assistant</p>

                </div>

            </div>

            <button
                className="newChatBtn"
                onClick={createNewChat}
            >
                <i className="fa-solid fa-plus"></i>

                New Chat

            </button>

        </div>

        {/* History */}


            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={(e) => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted": " "}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>
 
            <div className="sign">
                <p>By Aditi Jain &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;