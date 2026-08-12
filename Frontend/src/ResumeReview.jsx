import { useState } from "react";
import "./ResumeReview.css";

function ResumeReview() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div className="resumePage">

            <div className="resumeHeader">
                <h1>AI Resume Analyzer</h1>

                <p>
                    Upload your resume and get AI-powered feedback,
                    ATS insights and improvement suggestions.
                </p>
            </div>

            <div className="resumeUploadCard">

                <div className="uploadIcon">
                    📄
                </div>

                <h2>
                    Upload Your Resume
                </h2>

                <p>
                    Upload your PDF resume to analyze it with Vyora AI.
                </p>

                <label className="uploadBtn">
                    {file ? "Choose Another Resume" : "Choose Resume"}

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        hidden
                    />
                </label>

                {file && (
                    <div className="selectedFile">
                        <span>📄 {file.name}</span>
                        <span>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                    </div>
                )}

                {file && (
                    <button className="analyzeBtn">
                        ✨ Analyze Resume
                    </button>
                )}

            </div>

            <div className="resumeFeatures">

                <div className="resumeFeatureCard">
                    <span>🎯</span>
                    <h3>ATS Score</h3>
                    <p>
                        See how well your resume performs against ATS systems.
                    </p>
                </div>

                <div className="resumeFeatureCard">
                    <span>💡</span>
                    <h3>AI Suggestions</h3>
                    <p>
                        Get actionable suggestions to improve your resume.
                    </p>
                </div>

                <div className="resumeFeatureCard">
                    <span>🔍</span>
                    <h3>Skill Analysis</h3>
                    <p>
                        Identify missing skills and important keywords.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default ResumeReview;