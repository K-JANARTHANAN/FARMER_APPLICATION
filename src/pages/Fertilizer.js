import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Fertilizer.css"; // Ensure the CSS file is imported
 
 

const Fertilizer = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    fertilizedDate: "",
    fertilizerType: "",
    modeOfFertilizer: ""
  });

  const [fertilizers, setFertilizers] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/fertilizers/add", formData);
      alert("Fertilizer details submitted successfully");
      setFormData({ farmerName: "", fertilizedDate: "", fertilizerType: "", modeOfFertilizer: "" });
    } catch (error) {
      console.error("Error submitting fertilizer details", error);
      alert("Failed to submit fertilizer details");
    }
  };

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/fertilizers/all");
      setFertilizers(response.data);

      // Group fertilizer types for pie chart
      const fertilizerCounts = response.data.reduce((acc, fertilizer) => {
        acc[fertilizer.fertilizerType] = (acc[fertilizer.fertilizerType] || 0) + 1;
        return acc;
      }, {});

      setChartData(Object.entries(fertilizerCounts).map(([name, value]) => ({ name, value })));
    } catch (error) {
      console.error("Error fetching fertilizers", error);
      alert("Failed to fetch fertilizer details");
    }
  };

  return (
    <div className="fertilizer-page">
  <div className="fertilizer-container"> 
    <div className="fertilizer-container">
      <h2>If you want to fertilize your land, please fill here</h2>
      <form onSubmit={handleSubmit} className="fertilizer-form">
        <input type="text" name="farmerName" placeholder="Farmer Name" value={formData.farmerName} onChange={handleChange} required />
        <input type="date" name="fertilizedDate" value={formData.fertilizedDate} onChange={handleChange} required />
        <input type="text" name="fertilizerType" placeholder="Types of Fertilizer" value={formData.fertilizerType} onChange={handleChange} required />
        <input type="text" name="modeOfFertilizer" placeholder="Mode of Fertilizer" value={formData.modeOfFertilizer} onChange={handleChange} required />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <h2>Click for Others</h2>
      <button className="fetch-btn" onClick={fetchFertilizers}>Check Fertilizer Details</button>

      {fertilizers.length > 0 && (
        <div className="details">
          <h3>List of Fertilizer Records</h3>
          <ul className="fertilizer-list">
            {fertilizers.map((fertilizer, index) => (
              <li key={index}>
                <strong>Farmer Name:</strong> {fertilizer.farmerName} |
                <strong> Fertilizer Type:</strong> {fertilizer.fertilizerType}
              </li>
            ))}
          </ul>

          <h3>Fertilizer Type Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" label outerRadius={80} fill="#8884d8" dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
    </div>
</div>
  );
};

export default Fertilizer;
