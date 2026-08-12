import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ResumeReview from "./ResumeReview.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
            element={<Landing />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
         path="/resume-review"
         element={<ResumeReview />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;