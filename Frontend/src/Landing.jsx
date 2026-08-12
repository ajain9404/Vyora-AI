import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
function Landing() {

    const navigate = useNavigate();

    const previews = [
  {
    question: "Explain Binary Search in Java",
    answer:
      "Binary Search is a fast searching algorithm that works on sorted arrays. It repeatedly divides the search space into half until the target element is found."
  },
  {
  question: "Help me prepare for a coding interview",
  answer:
    "Focus on DSA patterns, practice common coding problems, strengthen core CS concepts and use mock interviews to build confidence."
  },
  {
    question: "Generate React Login Page",
    answer:
      "Here's a modern React login page with glassmorphism, gradient buttons and responsive design."
  },
  {
    question: "Solve this DSA Problem",
    answer:
      "Let's solve it step by step. First understand the pattern, then optimize using two pointers."
  }
];

const [current, setCurrent] = useState(0);
const [typedText, setTypedText] = useState("");
const [conversationCount, setConversationCount] = useState(0);
const [developerCount, setDeveloperCount] = useState(0);
const [accuracyCount, setAccuracyCount] = useState(0);
const [availabilityCount, setAvailabilityCount] = useState(0);
const statsRef = useRef(null);
const statsTitleRef = useRef(null);
const [statsVisible, setStatsVisible] = useState(false);

useEffect(() => {

    const observer = new IntersectionObserver(
        ([entry]) => {

            if (entry.isIntersecting) {

                setStatsVisible(true);

                observer.disconnect();
            }

        },
        {
            threshold: 0.1
        }
    );

    if (statsRef.current) {
        observer.observe(statsRef.current);
    }

    return () => {
        observer.disconnect();
    };

}, []);

useEffect(() => {

    if (!statsVisible) return;

    let conversation = 0;
    let developer = 0;
    let accuracy = 0;
    let availability = 0;

    const timer = setInterval(() => {

        conversation += 100;
        developer += 5;
        accuracy = Math.min(99.9, accuracy + 1.1);
        availability += 1;

        setConversationCount(
            Math.min(conversation, 10000)
        );

        setDeveloperCount(
            Math.min(developer, 500)
        );

        setAccuracyCount(
            Math.min(accuracy, 99.9)
        );

        setAvailabilityCount(
            Math.min(availability, 24)
        );

        if (
            conversation >= 10000 &&
            developer >= 500 &&
            accuracy >= 99.9 &&
            availability >= 24
        ) {
            clearInterval(timer);
        }

    }, 30);

    return () => {
        clearInterval(timer);
    };

}, [statsVisible]);

useEffect(() => {

    let index = 0;

    const typing = setInterval(() => {

        setTypedText(
            previews[current].answer.slice(0, index)
        );

        index++;

        if(index > previews[current].answer.length){

            clearInterval(typing);

            setTimeout(() => {

                setCurrent(
                    (prev) => (prev + 1) % previews.length
                );

                setTypedText("");

            },2500);

        }

    },25);

    return ()=>clearInterval(typing);

},[current]);

useEffect(() => {

    if (!statsVisible) return;

    let conversation = 0;
    let developer = 0;
    let accuracy = 0;
    let availability = 0;

    const timer = setInterval(() => {

        conversation += 100;
        developer += 5;
        accuracy = Math.min(
        99.9,
        Number((accuracy + 1.1).toFixed(1))
);
        availability += 1;

        setConversationCount(Math.min(conversation, 10000));
        setDeveloperCount(Math.min(developer, 500));
       setAccuracyCount(
       Math.min(
        Number(accuracy.toFixed(1)),
        99.9
    )
);
        setAvailabilityCount(Math.min(availability, 24));

        if (
            conversation >= 10000 &&
            developer >= 500 &&
            accuracy >= 99.9 &&
            availability >= 24
        ) {
            clearInterval(timer);
        }

    }, 30);

    return () => clearInterval(timer);

}, [statsVisible]);

    return (

        <div className="landing">

            {/* Navbar */}

            <nav className="landingNav">

                <div className="logoSection">

                    <img
                        src="/favicon.png"
                        alt="Vyora AI"
                    />

                    <span>Vyora AI</span>

                </div>

                <div className="navButtons">

                    <button
                        className="loginNavBtn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="startBtn"
                        onClick={() => navigate("/signup")}
                    >
                        Get Started
                    </button>

                </div>

            </nav>

            {/* Hero */}

            <section className="hero">

                <img
                    src="/favicon.png"
                    alt="Vyora AI"
                    className="heroLogo"
                />

                <h1>

                    Build Smarter
                    <br />

                    <span>with AI</span>

                </h1>

                <p>

                     Your Intelligent Companion for Every Idea.

                </p>

                <p>Have a conversation. Explore ideas. Solve problems. Get things done.</p>

                <div className="heroButtons">

                    <button
                        className="primaryBtn"
                        onClick={() => navigate("/signup")}
                    >
                        Get Started
                    </button>

                    <button
                        className="secondaryBtn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>

                <div className="landingPreview">

                    

    <div className="previewTop">

        <img
            src="/favicon.png"
            alt="Vyora AI"
            className="previewAvatar"
        />

        <span>Vyora AI Preview</span>

    </div>

    <div className="userBubble">

        👤  {previews[current].question}

    </div>

    <div className="aiBubble">

        🤖{typedText}
        <span className="typingCursor">▋</span>

    </div>

</div>

<section className="featuresSection">

    <h2>Why Choose Vyora AI</h2>

    <p>
        Powerful AI features designed to boost your
        productivity and help you build faster.
    </p>

    <div className="featuresGrid">

        <div className="featureCard">
            <span>💻</span>
            <h3>AI Chat</h3>
            <p>Ask anything and get instant AI answers.</p>
        </div>

        <div className="featureCard">
            <span>🧠</span>
            <h3>Learn DSA</h3>
            <p>Master data structures with AI guidance.</p>
        </div>

        <div className="featureCard">
            <span>🧩</span>
            <h3>Problem Solving</h3>
            <p>Break down complex problems with AI guidance.</p>
        </div>

        <div className="featureCard">
            <span>⚡</span>
            <h3>Lightning Fast</h3>
            <p>Get responses in seconds.</p>
        </div>

        <div className="featureCard">
            <span>🔒</span>
            <h3>Secure</h3>
            <p>Your conversations stay private.</p>
        </div>

        <div className="featureCard">
            <span>💡</span>
            <h3>Brainstorm</h3>
            <p>Generate creative ideas instantly.</p>
        </div>

    </div>

</section>

            </section>

        <section ref={statsRef} className="statsSection">

    <h2 ref={statsTitleRef}>Trusted by Developers</h2>

    <p>
        Everything you need to learn, build and grow faster with AI.
    </p>

    <div className="statsGrid">

        <div className="statCard">

            <h1>{conversationCount.toLocaleString()}+</h1>

            <span>Conversations</span>

        </div>

        <div className="statCard">

            <h1>{developerCount}+</h1>

            <span>Developers</span>

        </div>

        <div className="statCard">

            <h1>{accuracyCount}%</h1>

            <span>Accuracy</span>

        </div>

        <div className="statCard">

            <h1>{availabilityCount}/7</h1>

            <span>Availability</span>

        </div>

    </div>

</section>

            <footer className="footer">

    <div className="footerTop">

        <div className="footerBrand">

            <img
                src="/favicon.png"
                alt="Vyora AI"
            />

            <h2>Vyora AI</h2>

            <p>
                Build smarter with AI. Your intelligent assistant
                for coding, learning and productivity.
            </p>

        </div>

        <div className="footerLinks">

            <div>

                <h3>Product</h3>

                <a href="#">Features</a>
                <a href="#">AI Chat</a>
                <a href="#">Resume Review</a>
                <a href="#">Pricing</a>

            </div>

            <div>

                <h3>Resources</h3>

                <a href="#">GitHub</a>
                <a href="#">Support</a>
                <a href="#">FAQ</a>
                <a href="#">Contact</a>

            </div>

            <div>

                <h3>Company</h3>

                <a href="#">About</a>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Careers</a>

            </div>

        </div>

    </div>

    <div className="footerBottom">

        © 2026 Vyora AI • AI-Powered. Human-Centered.

    </div>

</footer>

        </div>



        

    );
}

export default Landing;