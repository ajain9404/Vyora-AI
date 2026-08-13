import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

function ChatWindow({ sidebarOpen, setSidebarOpen }) {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const getReply = async () => {

    if (!prompt.trim() || loading) return;

    setLoading(true);
    setNewChat(false);
    setErrorMessage("");

    console.log("message ", prompt, " threadId ", currThreadId);

    const options = {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },

        body: JSON.stringify({
            message: prompt,
            threadId: currThreadId
        })
    };

    try {

        const response = await fetch(`${API_URL}/api/chat`, options); 


        const res = await response.json();

        console.log(res);

        if (!response.ok) {
            throw new Error(
                res.error || res.message || "Something went wrong."
            );
        }

        setReply(res.reply);

    } catch (err) {

        console.error("Chat error:", err);

        setErrorMessage(
            err.message || "Something went wrong. Please try again."
        );

    } finally {

        setLoading(false);

    }
};

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">

                <button
               className="sidebarToggle"
               onClick={() => setSidebarOpen(!sidebarOpen)}
               >
              ☰
              </button>
                <span>
                 
                </span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                   <div
    className="dropDownItem"
    onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    }}
>
    <i className="fa-solid fa-arrow-right-from-bracket"></i>
    Log Out
</div>
                </div>
            }
            <Chat loading={loading} />

            {errorMessage && (
    <div className="errorMessage">
        {errorMessage}
    </div>
)}

            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask Vyora AI anything..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    >
                           
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                AI-generated responses may be inaccurate. Please verify important information.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;