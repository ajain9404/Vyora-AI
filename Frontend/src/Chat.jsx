import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function Chat({ loading }) {
    const {
        newChat,
        prevChats,
        reply,
        setPrompt
    } = useContext(MyContext);

    // Controls the progressive AI response
    const [latestReply, setLatestReply] = useState("");

    // Animate the latest response
    useEffect(() => {
        if (!reply) {
            setLatestReply("");
            return;
        }

        let index = 0;

        // Start from empty
        setLatestReply("");

        const interval = setInterval(() => {
            index += 7;

            setLatestReply(reply.slice(0, index));

            if (index >= reply.length) {
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval);

    }, [reply]);


    const formatAIContent = (content) => {
        if (!content) return "";

        let formatted = content;

        // Convert \( ... \) to inline math
        formatted = formatted.replace(
            /\\\(([\s\S]*?)\\\)/g,
            (_, math) => `$${math}$`
        );

        // Convert \[ ... \] to display math
        formatted = formatted.replace(
            /\\\[([\s\S]*?)\\\]/g,
            (_, math) => `\n$$\n${math}\n$$\n`
        );

        // Fix compact $$ ... $$ blocks
        formatted = formatted.replace(
            /\$\$([\s\S]*?)\$\$/g,
            (_, math) => `\n$$\n${math.trim()}\n$$\n`
        );

        // Wrap unwrapped aligned environments
        formatted = formatted.replace(
            /(?<!\$)\s*\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}\s*(?!\$)/g,
            (_, math) =>
                `\n$$\n\\begin{aligned}${math}\\end{aligned}\n$$\n`
        );

        // Convert HTML <br> tags
        formatted = formatted.replace(
            /<br\s*\/?>/gi,
            "\n"
        );

        // Convert HTML list items to Markdown bullets
formatted = formatted.replace(
    /<li>([\s\S]*?)<\/li>/gi,
    "- $1\n"
);

// Remove list wrappers
formatted = formatted.replace(/<\/?ul>/gi, "");
formatted = formatted.replace(/<\/?ol>/gi, "");

// Remove common HTML formatting tags
formatted = formatted.replace(/<\/?div>/gi, "");
formatted = formatted.replace(/<\/?p>/gi, "");

        return formatted;
    };


    const quickPrompts = [
        {
            icon: "✨",
            title: "Explain Code",
            prompt: "Explain this code in detail."
        },
        {
            icon: "📚",
            title: "Learn DSA",
            prompt: "Teach me Binary Search from beginner to advanced."
        },
        {
            icon: "🎯",
            title: "Interview Prep",
            prompt: "Help me prepare for a software engineering interview."
        },
        {
            icon: "💡",
            title: "Brainstorm",
            prompt: "Give me startup ideas using AI."
        }
    ];


    return (
        <>
            {newChat && (
                <div className="welcome">

                    <img
                        src="/favicon.png"
                        alt="Vyora AI"
                        className="welcomeLogo"
                    />

                    <h1>
                        Welcome to <span className="brand">Vyora AI</span>
                    </h1>

                    <p className="welcome-subtitle">
                         intelligent AI assistant for coding, learning,
                        writing and everyday productivityYour.
                    </p>

                    <div className="suggestionGrid">

                        {quickPrompts.map((item) => (

                            <div
                                key={item.title}
                                className="suggestionCard"
                                onClick={() => setPrompt(item.prompt)}
                            >
                                <div
                                    style={{
                                        fontSize: "30px",
                                        marginBottom: "12px"
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <strong>{item.title}</strong>
                            </div>

                        ))}

                    </div>

                </div>
            )}

<div className="chats">

    {prevChats?.map((chat, idx) => {

        // When a new response is being generated,
        // don't display the last assistant message from prevChats.
        const isLastMessage =
            idx === prevChats.length - 1;

        const isGenerating =
            reply && chat.role === "assistant" && isLastMessage;

        if (isGenerating) {
            return null;
        }

        return (
            <div
                key={idx}
                className={
                    chat.role === "user"
                        ? "userDiv"
                        : "gptDiv"
                }
            >

                {chat.role === "user" ? (

                    <p className="userMessage">
                        {chat.content}
                    </p>

                ) : (

                    <ReactMarkdown
                        remarkPlugins={[
                            remarkGfm,
                            remarkMath
                        ]}
                        rehypePlugins={[
                            rehypeHighlight,
                            rehypeKatex
                        ]}
                    >
                        {formatAIContent(chat.content)}
                    </ReactMarkdown>

                )}

            </div>
        );
    })}


    {/* Currently generating AI response */}
    {reply && latestReply && (

        <div className="gptDiv">

            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkMath
                ]}
                rehypePlugins={[
                    rehypeHighlight,
                    rehypeKatex
                ]}
            >
                {formatAIContent(latestReply)}
            </ReactMarkdown>

        </div>

    )}


    {/* Thinking indicator */}
    {loading && (

        <div className="thinkingContainer">

            <div className="thinkingHeader">

                <img
                    src="/favicon.png"
                    alt="Vyora AI"
                    className="thinkingLogo"
                />

                <span>Vyora AI</span>

            </div>

            <div className="thinkingText">
                Thinking...
            </div>

            <div className="thinkingDots">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

    )}

</div>
        </>
    );
}

export default Chat;