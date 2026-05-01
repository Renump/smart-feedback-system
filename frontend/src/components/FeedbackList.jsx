import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FeedbackList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      alert("Admin only");
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/api/all-feedback/")
      .then(res => setData(res.data));
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-user/${userId}/`);
      alert("User deleted");
      fetchData();
    } catch {
      alert("Error deleting user");
    }
  };

  return (
    <div className="container">
      <h3>User Feedback Details</h3>

      <table className="table table-glass mt-3">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Feedback</th>
            <th>Sentiment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="fw-medium">{item.user__username}</td>
              <td>{item.product || 'General'}</td>
              <td>{item.text}</td>
              <td>
                <span className={`badge ${item.sentiment === 'Positive' ? 'bg-success' : item.sentiment === 'Negative' ? 'bg-danger' : 'bg-secondary'}`}>
                  {item.sentiment}
                </span>
              </td>
              <td>
                <button
                  className="btn-danger-custom btn-sm"
                  onClick={() => handleDelete(item.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackList;