# 🚀 Vyora AI

> A full-stack AI assistant for coding, learning, brainstorming and everyday productivity.

Vyora AI is a full-stack AI-powered chatbot built with React, Node.js, Express, MongoDB and Google Gemini. It provides secure authentication, persistent conversations and a responsive ChatGPT-style interface.

## ✨ Features

- 🔐 Secure user authentication with JWT
- 🔑 Password hashing with bcrypt
- 🤖 AI-powered conversations using Google Gemini
- 💾 Persistent chat history with MongoDB
- 🧵 Separate conversation threads
- 📝 Automatic chat titles
- 🗑️ Delete conversations
- ➕ Create new conversations
- 📱 Responsive desktop and mobile UI
- 📂 ChatGPT-style collapsible sidebar
- 💬 Markdown and code-block rendering
- ⚡ AI thinking/loading animation
- 🔒 User-specific conversation history

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- CSS
- Lucide React
- React Markdown
- Highlight.js
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Google Gemini API

## 🏗️ Architecture

```text
React Frontend
      │
      │ REST API
      ▼
Node.js + Express
      │
      ├── JWT Authentication
      ├── Gemini API
      │
      ▼
MongoDB
      │
      └── Users + Conversations