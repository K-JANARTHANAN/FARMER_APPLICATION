import React, { useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Fertilizer.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Fertilizer = () => {
  const [tableNumber, setTableNumber] = useState(1);
  const [formData, setFormData] = useState({
    farmerName: "",
    fertilizedDate: "",
    fertilizerType: "",
    modeOfFertilizer: "",
  });
  const [fertilizers, setFertilizers] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTableChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/fertilizers/add/${tableNumber}`, formData);
      alert("Fertilizer details submitted successfully!");
      setFormData({
        farmerName: "",
        fertilizedDate: "",
        fertilizerType: "",
        modeOfFertilizer: "",
      });
    } catch (error) {
      console.error("Error submitting fertilizer details", error);
      alert("Failed to submit fertilizer details.");
    }
  };

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/fertilizers/all/${tableNumber}`);
      setFertilizers(response.data);

      // Group data for Pie Chart
      const fertilizerCounts = response.data.reduce((acc, fertilizer) => {
        acc[fertilizer.fertilizerType] = (acc[fertilizer.fertilizerType] || 0) + 1;
        return acc;
      }, {});

      setChartData(
        Object.entries(fertilizerCounts).map(([name, value]) => ({
          name,
          value,
        }))
      );
    } catch (error) {
      console.error("Error fetching fertilizer details", error);
      alert("Failed to fetch fertilizer details.");
    }
  };

  return (
    <div className="fertilizer-page">
      <h2>Select Table Number</h2>
      <input
        type="number"
        min="1"
        max="10"
        value={tableNumber}
        onChange={handleTableChange}
      />
      <h2>Enter Fertilizer Details</h2>
      <form onSubmit={handleSubmit} className="fertilizer-form">
        <input
          type="text"
          name="farmerName"
          placeholder="Farmer Name"
          value={formData.farmerName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fertilizedDate"
          value={formData.fertilizedDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fertilizerType"
          placeholder="Type of Fertilizer"
          value={formData.fertilizerType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="modeOfFertilizer"
          placeholder="Mode of Fertilizer"
          value={formData.modeOfFertilizer}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={fetchFertilizers}>Check Fertilizer Details</button>

      {fertilizers.length > 0 && (
        <div className="details">
          <h3>List of Fertilizer Records</h3>
          <ul>
            {fertilizers.map((fertilizer, index) => (
              <li key={index}>
                <strong>Farmer Name:</strong> {fertilizer.farmerName} |{" "}
                <strong>Fertilizer Type:</strong> {fertilizer.fertilizerType}
              </li>
            ))}
          </ul>

          <h3>Fertilizer Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Fertilizer;
