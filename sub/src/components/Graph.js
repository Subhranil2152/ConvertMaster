import React from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2"; // or any other chart library
 
function Graph() {
  const location = useLocation();
  const { samples } = location.state;
 
  // Prepare your data for the chart
  const data = {
    labels: samples.map(sample => sample.testMethod), // X-axis labels (test methods)
    datasets: samples.map((sample, index) => ({
      label: `Sample ${sample.sampleId}`,
      data: sample.result, // Y-axis data (result)
      borderColor: index % 2 === 0 ? "green" : "red", // Different colors for different samples
      fill: false,
    })),
  };
 
  return (
    <div>
      <h1>Comparison Graph</h1>
      <Line data={data} />
    </div>
  );
}
 
export default Graph;