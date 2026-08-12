import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1E293B",
            color: "#fff",
            border: "1px solid #7C3AED",
            borderRadius: "12px",
          },
        }}
      />
    </>
  </StrictMode>
);