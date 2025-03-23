 
import React, { useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ScatterChart,
  Scatter,
} from "recharts";
import "./Crops.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

const Crops = () => {
  const [tableName, setTableName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cropType: "",
    duration: "",
    plantingDate: "",
  });
  const [farmers, setFarmers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [scatterData, setScatterData] = useState([]);

  const handleTableChange = (e) => {
    setTableName(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableName) {
      alert("Please enter a valid table number (1-10)");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/farmers/add?tableName=${tableName}`, formData);
      alert(`Crop details submitted successfully in table ${tableName}`);
      setFormData({ name: "", cropType: "", duration: "", plantingDate: "" });
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit crop details");
    }
  };

  const handleFetchFarmers = async () => {
    if (!tableName) {
      alert("Please enter a valid table number to fetch data");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/farmers/all?tableName=${tableName}`);
      setFarmers(response.data);

      // Pie Chart Data (Crop Distribution)
      const cropCounts = response.data.reduce((acc, farmer) => {
        acc[farmer.cropType] = (acc[farmer.cropType] || 0) + 1;
        return acc;
      }, {});

      const pieData = Object.keys(cropCounts).map((crop) => ({
        name: crop,
        value: cropCounts[crop],
      }));

      setChartData(pieData);

      // Bar Chart Data (Duration per Farmer)
      const barData = response.data.map((farmer) => ({
        name: farmer.name,
        duration: parseInt(farmer.duration, 10),
      }));

      setBarChartData(barData);

      // Scatter Chart Data (Planting Date Range 1-30)
      const scatterData = response.data.map((farmer) => ({
        name: farmer.name,
        plantingDate: parseInt(farmer.plantingDate.split("-")[2], 10) || 1, // Extract day from date
      }));

      setScatterData(scatterData);
    } catch (error) {
      console.error("Error fetching farmers", error);
      alert("Failed to fetch farmers");
    }
  };

  return (
    <div className="crop-page">
      <h2>  <a href="\places.pdf" download="places.pdf">PLACES DETAILS</a></h2>
      <input
        type="number"
        min="1"
        max="10"
        value={tableName}
        onChange={handleTableChange}
        required
      />

      <h2>New Farmer - Crop Details</h2>
      <form onSubmit={handleSubmit}>
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

      <h2>Check Farmer Details</h2>
      <button onClick={handleFetchFarmers}>Check Farmer Details</button>

      {farmers.length > 0 && (
        <div>
          <h3>List of Farmers</h3>
          <ul>
            {farmers.map((farmer, index) => (
              <li key={index}>
                <strong>Name:</strong> {farmer.name} | <strong>Crop Type:</strong> {farmer.cropType} |{" "}
                <strong>Duration:</strong> {farmer.duration} months |{" "}
                <strong>Planting Date:</strong> {farmer.plantingDate}
              </li>
            ))}
          </ul>

          {/* Pie Chart - Crop Distribution */}
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

          {/* Bar Chart - Duration per Farmer */}
          {barChartData.length > 0 && (
            <div className="chart-container">
              <h3>Duration per Farmer</h3>
              <BarChart width={500} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#82ca9d" />
              </BarChart>
            </div>
          )}

          {/* Scatter Chart - Planting Date Distribution */}
          {scatterData.length > 0 && (
            <div className="chart-container">
              <h3>Planting Date Distribution</h3>
              <ScatterChart width={500} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="name" name="Farmer Name" />
                <YAxis type="number" dataKey="plantingDate" name="Planting Date" domain={[1, 31]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Planting Dates" data={scatterData} fill="#ff7300" />
              </ScatterChart>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Crops;
