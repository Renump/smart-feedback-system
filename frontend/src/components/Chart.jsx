import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartTitle, setChartTitle] = useState("System Feedback Analysis");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      alert("Admin only access");
      navigate("/login");
      return;
    }

    fetchSystemStats();
  }, []);

  const fetchSystemStats = () => {
    axios.get("http://127.0.0.1:8000/api/stats/")
      .then(res => {
          setData(res.data);
          setChartTitle("System Feedback Analysis");
      });
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file first!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/upload-csv/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setData(res.data.stats);
      setChartTitle(`CSV Analysis: ${file.name}`);
    } catch (error) {
      alert("Error analyzing CSV: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const backgroundColors = data.map(item => {
    if (item.sentiment === 'Positive') return "#28a745"; // Green
    if (item.sentiment === 'Negative') return "#dc3545"; // Red
    return "#6c757d"; // Gray (Neutral)
  });

  const chartData = {
    labels: data.map(item => item.sentiment),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 mb-4">
        <div className="glass-card">
          <h4 className="mb-3 text-center">Bulk Analyze CSV</h4>
          <p className="text-muted small text-center">Upload a CSV file with a "text" column to analyze sentiment in bulk.</p>
          <div className="input-group mb-3">
            <input type="file" className="form-control" accept=".csv" onChange={handleFileChange} />
            <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
              {loading ? "Analyzing..." : "Upload & Analyze"}
            </button>
          </div>
          {chartTitle !== "System Feedback Analysis" && (
              <button className="btn btn-outline-secondary w-100 mt-2" onClick={fetchSystemStats}>
                  Reset to System Stats
              </button>
          )}
        </div>
      </div>

      <div className="col-md-6">
        <div className="glass-card text-center">
          <h4 className="mb-3">{chartTitle}</h4>
          {data.length > 0 ? (
            <Pie data={chartData} />
          ) : (
            <p className="text-muted">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartComponent;