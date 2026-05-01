import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      localStorage.clear();

      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      alert(res.data.message);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username); // ✅ Storing username for feedback submission

      if (res.data.isAdmin) {
        localStorage.setItem("isAdmin", "true");
        navigate("/chart");
      } else {
        navigate("/feedback");
      }

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="glass-card">
          <h2 className="text-center mb-4 text-primary">Welcome Back</h2>

          <div className="mb-3">
              <label className="form-label text-muted fw-medium">Username</label>
              <input className="form-control-custom" placeholder="Enter your username"
                value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="mb-4">
              <label className="form-label text-muted fw-medium">Password</label>
              <input type="password" className="form-control-custom" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn-primary-custom w-100 py-3" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;