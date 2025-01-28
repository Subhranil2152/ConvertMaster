import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import "../CSS/GraphGenerator.css";
 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
 
const GraphGenerator = () => {
  const location = useLocation();
  const { selectedLots, selectedSamples, testMethod, selectedParam } = location.state;
  const [testResults, setTestResults] = useState([]);
 
  useEffect(() => {
    if (!selectedLots.length || !selectedSamples.length || !testMethod || !selectedParam) {
      console.log("Incomplete selections. Ensure all fields are selected.");
      return; // Skip fetching data if any field is empty
    }
 
    const lotIds = selectedLots.join(",");
    const sampleIds = selectedSamples.join(",");
const url = `http://127.0.0.1:5000/samples_test_result_by_lot/${lotIds}?sample_ids=${sampleIds}&test_method=${testMethod}&param=${selectedParam}`;
 
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the full API response
        const filteredResults = data
          .map((item) => {
            const testResult = item.tests_results.find(
              (result) =>
                result.test_method === testMethod && result.parameters === selectedParam
            );
            return testResult ? { sampleId: item.sample_id, testResult } : null;
          })
          .filter((item) => item); // Filter out null results
 
        console.log("Filtered results:", filteredResults);  // Log the filtered results
        if (filteredResults.length === 0) {
          console.log("No matching results found.");
        }
        setTestResults(filteredResults);
      })
      .catch((error) => console.error("Error fetching test results:", error));
  }, [selectedLots, selectedSamples, testMethod, selectedParam]);
 
  // Prepare data for the graph
  const barChartData = {
    labels: testResults.map((result) => result.sampleId),
    datasets: [
      {
        label: `${testMethod} - ${selectedParam}`,
        data: testResults.map((result) => result.testResult.result_value), // Use the result_value
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
 
  const barChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const result = testResults[tooltipItem.dataIndex];
            return `${selectedParam}: ${result.testResult.result_value}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Value (mg)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Sample IDs",
        },
      },
    },
  };
 
  return (
    <motion.div
      className="graph-generator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="content-container">
        {/* Charts Section */}
        <div className="charts-container">
          <div className="bar-chart-container">
            <h2>
              {testMethod} - {selectedParam}
            </h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
 
        {/* Info Panel Section */}
        <div className="info-panel">
          <h3>Selected Criteria</h3>
          <p>
            <strong>Lot IDs:</strong> {selectedLots.join(", ")}
          </p>
          <p>
            <strong>Sample IDs:</strong> {selectedSamples.join(", ")}
          </p>
          <p>
            <strong>Test Method:</strong> {testMethod}
          </p>
          <p>
            <strong>Parameter:</strong> {selectedParam}
          </p>
          <h3>Test Results</h3>
          <ul>
            {testResults.map((result, index) => (
              <li key={index}>
                <strong>Sample ID:</strong> {result.sampleId} -{" "}
                <strong>Value:</strong> {result.testResult.result_value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
 
export default GraphGenerator;