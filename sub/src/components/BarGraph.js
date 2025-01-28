import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarGraph = ({ data, selectedTest }) => {
  const filteredData = data.samples.map((sample) => {
    const test = sample.tests.find((t) => t.test === selectedTest);
    return {
      sample: sample.sample,
      result: test ? test.result : 0,
    };
  });

  const chartData = {
    labels: filteredData.map((d) => `Sample ${d.sample}`),
    datasets: [
      {
        label: selectedTest,
        data: filteredData.map((d) => d.result),
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="bar-graph">
      <h2>{selectedTest} Comparison</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
