import React, { useState } from "react";
import Dropdown from "./Dropdown";
import BarGraph from "./BarGraph";

const GraphPage = () => {
  // Hardcoded JSON data
  const data = {
    samples: [
      {
        sample: 1,
        tests: [
          {
            test: "Acetaminophen",
            method: "ASSAY",
            spec: "0.3-0.6",
            result: 2.0,
          },
          { test: "Caffeine", method: "ASSAY", spec: "1-4", result: 1.8 },
          {
            test: "Actenaide",
            method: "ASSAY",
            spec: "2-4.5",
            result: 0.7,
          },
          {
            test: "Acetksvasyclic",
            method: "ASSAY",
            spec: "2-5.78",
            result: 2.7,
          },
          {
            test: "Impurity",
            method: "ASSAY",
            spec: "4-7",
            result: 3.17,
          },
          {
            test: "Phenacetin",
            method: "ASSAY",
            spec: "3.2-5.1",
            result: 1.89,
          },
        ],
      },
      {
        sample: 2,
        tests: [
          {
            test: "Acetaminophen",
            method: "ASSAY",
            spec: "0.8-0.9",
            result: 1.8,
          },
          { test: "Caffeine", method: "ASSAY", spec: "1-7", result: 2.2 },
          {
            test: "Actenaide",
            method: "ASSAY",
            spec: "3-4.5.7",
            result: 4.0,
          },
          {
            test: "Acetksvasyclic",
            method: "ASSAY",
            spec: "4-5.78",
            result: 3.9,
          },
          {
            test: "Impurity",
            method: "ASSAY",
            spec: "4-9",
            result: 5.25,
          },
          {
            test: "Phenacetin",
            method: "ASSAY",
            spec: "4.2-7.1",
            result: 5.75,
          },
        ],
      },
    ],
  };

  const [selectedTest, setSelectedTest] = useState(""); // Store the selected test
  const [showGraph, setShowGraph] = useState(false); // Toggle to show the graph

  const handleGenerateGraph = () => {
    if (selectedTest) {
      setShowGraph(true);
    } else {
      alert("Please select a test to generate the graph.");
    }
  };

  return (
    <div className="homepage">
      <h1>Sample Comparison</h1>
      <Dropdown
        tests={data.samples[0].tests.map((test) => test.test)}
        setSelectedTest={setSelectedTest}
      />
      <button onClick={handleGenerateGraph} className="generate-btn">
        Generate Graph
      </button>
      {showGraph && <BarGraph data={data} selectedTest={selectedTest} />}
    </div>
  );
};

export default GraphPage;
