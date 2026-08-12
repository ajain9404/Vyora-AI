# 🚀 Vyora AI

<p align="center">
  <img src="Frontend/public/vyoraAI.png" width="100" alt="Vyora AI Logo">
</p>

<h3 align="center">
  Your Intelligent AI Assistant for Coding, Learning & Productivity
</h3>

<p align="center">
  A modern full-stack AI assistant built with React, Node.js, Express, MongoDB and LLM APIs.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/LLM-Groq-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)
</p>

---

## ✨ Overview

**Vyora AI** is a full-stack AI-powered assistant designed to help users with coding, learning, brainstorming, writing and everyday productivity.

The application provides an interactive conversational experience with persistent chat history, secure authentication, Markdown rendering, syntax highlighting and mathematical notation using LaTeX.

---

## 🎯 Key Features

- 🤖 AI-powered conversational assistant
- 🔐 Secure JWT-based authentication
- 👤 User registration and login
- 💬 Persistent conversation history
- 🗂️ Create and manage multiple chats
- 🗑️ Delete previous conversations
- 📝 Rich Markdown rendering
- 💻 Syntax-highlighted code blocks
- 📐 LaTeX mathematical expression rendering
- 📊 Markdown table support
- ⚡ Fast AI responses
- 📱 Responsive interface
- 🔒 Environment-based API key management
- 🛡️ Protected backend routes

---

# 📸 Screenshots

## 🏠 Dashboard

<p align="center">
  <img src="screenshots/dashboard.png" width="90%">
</p>

---

## 💬 AI Chat

<p align="center">
  <img src="screenshots/dashboard-ai-chat.png" width="90%">
</p>

---

## 🗂️ Thinking Response

<p align="center">
  <img src="screenshots/ai-thinking-response.png" width="90%">
</p>

---

## 📱 Responsive Design

<p align="center">
  <img src="screenshots/Mobile Responsive.png" width="45%">
</p>

---

# 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- React Markdown
- Remark GFM
- Remark Math
- Rehype KaTeX
- Rehype Highlight
- CSS

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt

### Database

- MongoDB
- Mongoose

### AI

- Groq API
- LLM integration

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- Vite

---

# 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  UI + Markdown      │
                    │  Chat Interface     │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │                     │
                    │ Authentication      │
                    │ Chat Routes         │
                    │ Protected APIs      │
                    └──────┬───────┬──────┘
                           │       │
                 ┌─────────┘       └─────────┐
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │    MongoDB      │         │    Groq API     │
        │                 │         │                 │
        │ Users           │         │ LLM Responses   │
        │ Conversations   │         │                 │
        └─────────────────┘         └─────────────────┘

👨‍💻 Author

Aditi Jain

Built with ❤️ using React, Node.js, Express, MongoDB and AI APIs.

⭐ Support

If you find this project interesting, consider giving the repository a ⭐.