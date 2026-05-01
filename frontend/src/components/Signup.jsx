import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="glass-card">
          <h2 className="text-center mb-4 text-primary">Create Account</h2>

          <div className="mb-3">
              <label className="form-label text-muted fw-medium">Username</label>
              <input className="form-control-custom" placeholder="Choose a username"
                value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="mb-3">
              <label className="form-label text-muted fw-medium">Email Address</label>
              <input className="form-control-custom" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-4">
              <label className="form-label text-muted fw-medium">Password</label>
              <input type="password" className="form-control-custom" placeholder="Create a password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn-primary-custom w-100 py-3" onClick={handleSignup}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;