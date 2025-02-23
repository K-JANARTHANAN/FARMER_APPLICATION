import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Crops.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

const Crops = () => {
  const [formData, setFormData] = useState({
    name: "",
    cropType: "",
    duration: "",
    plantingDate: "",
  });
  const [farmers, setFarmers] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/farmers/add", formData);
      alert("Crop details submitted successfully");
      setFormData({ name: "", cropType: "", duration: "", plantingDate: "" });
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit crop details");
    }
  };

  const handleFetchFarmers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/farmers/all");
      setFarmers(response.data);

      // Prepare data for Pie Chart
      const cropCounts = response.data.reduce((acc, farmer) => {
        acc[farmer.cropType] = (acc[farmer.cropType] || 0) + 1;
        return acc;
      }, {});

      const pieData = Object.keys(cropCounts).map((crop) => ({
        name: crop,
        value: cropCounts[crop],
      }));

      setChartData(pieData);
    } catch (error) {
      console.error("Error fetching farmers", error);
      alert("Failed to fetch farmers");
    }
  };

  return (
    <div className="crop-page">
    <div className="container">
      <h2 className="title">New Farmer - Crop Details</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Farmer Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Crop Type:</label>
        <input type="text" name="cropType" value={formData.cropType} onChange={handleChange} required />

        <label>Duration (in months):</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

        <label>Planting Date:</label>
        <input type="date" name="plantingDate" value={formData.plantingDate} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      <h2 className="title">Click to Check Farmer Details</h2>
      <button onClick={handleFetchFarmers}>Check Farmer Details</button>

      {farmers.length > 0 && (
        <div>
          <h3>List of Farmers</h3>
          <ul className="farmer-list">
            {farmers.map((farmer, index) => (
              <li key={index} className="farmer-item">
                <strong>Name:</strong> {farmer.name} | <strong>Crop Type:</strong> {farmer.cropType} | 
                <strong>Duration:</strong> {farmer.duration} months | <strong>Planting Date:</strong> {farmer.plantingDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="chart-container">
          <h3>Crop Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx={200}
              cy={150}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
    </div>
  );
};

export default Crops;
