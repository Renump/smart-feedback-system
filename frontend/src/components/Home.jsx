import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="glass-card text-center" style={{ maxWidth: "600px", background: "rgba(255,255,255,0.9)" }}>
        <h1 className="display-5 fw-bold text-primary mb-3">Smart Feedback</h1>
        <p className="lead text-muted mb-4">
          Harness the power of AI to analyze user sentiment in real-time. Gain actionable insights from every piece of feedback.
        </p>

        <div className="d-flex gap-3 justify-content-center mt-4">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="btn-primary-custom px-4 py-2">
                Get Started
              </Link>
              <Link to="/login" className="btn-outline-custom px-4 py-2">
                Login
              </Link>
            </>
          ) : (
            <Link to="/feedback" className="btn-primary-custom px-4 py-2">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;