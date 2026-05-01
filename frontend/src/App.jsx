import { Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feedback from "./components/Feedback";
import ChartComponent from "./components/Chart";
import Home from "./components/Home";
import FeedbackList from "./components/FeedbackList";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand-custom">Smart Feedback</Link>

          <div className="d-flex ms-auto align-items-center">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link-custom me-3">Login</Link>
                <Link to="/signup" className="btn-primary-custom">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/feedback" className="nav-link-custom">Give Feedback</Link>

                {isAdmin && (
                  <>
                    <Link to="/chart" className="nav-link-custom">Dashboard</Link>
                    <Link to="/users" className="nav-link-custom">All Feedback</Link>
                  </>
                )}

                <button
                  className="btn-danger-custom ms-3"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chart" element={<ChartComponent />} />
          <Route path="/users" element={<FeedbackList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;