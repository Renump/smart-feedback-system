import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [product, setProduct] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login first");
      navigate("/login");
    }
  }, []);

  const submitFeedback = async () => {
    if (!product || !text) {
        return alert("Please fill in all fields.");
    }

    const username = localStorage.getItem("username");
    if (!username) {
        alert("Your session is invalid (missing username). Please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/submit/", {
        username,
        product,
        text,
      });

      alert(`Success! AI Sentiment Detected: ${res.data.sentiment}`);
      setProduct("");
      setText("");
    } catch (err) {
      alert("Error submitting feedback: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="glass-card">
          <h2 className="mb-4 text-center">Share Your Thoughts</h2>
          
          <div className="mb-4">
            <label className="form-label fw-semibold text-muted">Product Name</label>
            <input
              type="text"
              className="form-control-custom"
              placeholder="e.g. iPhone 15, Subscription Plan..."
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-muted">Your Feedback</label>
            <textarea
              className="form-control-custom"
              rows="5"
              placeholder="Tell us what you loved or what we can improve..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button className="btn-primary-custom w-100 py-3 mt-2" onClick={submitFeedback} disabled={loading}>
            {loading ? "Analyzing..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;