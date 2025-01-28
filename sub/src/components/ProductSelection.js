import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../CSS/ProductSelection.css";
 
const ProductSelection = () => {
  const [products, setProducts] = useState([]);
  const [lots, setLots] = useState([]);
  const [samples, setSamples] = useState([]);
  const [testMethods, setTestMethods] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedLots, setSelectedLots] = useState([]);
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [selectedTestMethod, setSelectedTestMethod] = useState("");
  const [selectedParameter, setSelectedParameter] = useState("");
  const navigate = useNavigate();
 
  // Fetch the product list
  useEffect(() => {
fetch("http://127.0.0.1:5000/products_with_lots_status")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
 
  // Fetch lots when a product is selected
  useEffect(() => {
    if (selectedProduct) {
      const productLots = products.find((p) => p[selectedProduct]);
      setLots(productLots ? productLots[selectedProduct] : []);
      setSelectedLots([]);
      setSamples([]);
      setSelectedSamples([]);
      setSelectedTestMethod("");
      setSelectedParameter(""); // Reset parameter on product change
      setTestMethods([]);
    }
  }, [selectedProduct, products]);
 
  // Fetch samples when lots are selected
  useEffect(() => {
    if (selectedLots.length > 0) {
      const lotIds = selectedLots.join(",");
fetch(`http://127.0.0.1:5000/lot_samples/${lotIds}`)
        .then((response) => response.json())
        .then((data) => {
          setSamples(data.sample_ids); // Assuming the response contains sample_ids
        })
        .catch((error) => console.error("Error fetching samples:", error));
    } else {
      setSamples([]);
      setTestMethods([]);
    }
  }, [selectedLots]);
 
  // Fetch test methods and parameters when samples are selected
  useEffect(() => {
    if (selectedSamples.length > 0) {
fetch(`http://127.0.0.1:5000/test_methods_with_params`)
        .then((response) => response.json())
        .then((data) => setTestMethods(data))
        .catch((error) => console.error("Error fetching test methods:", error));
    } else {
      setTestMethods([]);
    }
  }, [selectedSamples]);
 
  // Update parameters when a test method is selected
  useEffect(() => {
    if (selectedTestMethod) {
      setParameters(testMethods[selectedTestMethod] || []);
      setSelectedParameter("");
    } else {
      setParameters([]);
    }
  }, [selectedTestMethod, testMethods]);
 
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };
 
  const handleLotChange = (e) => {
    const lotId = e.target.value;
    if (e.target.checked) {
      if (selectedLots.length < 2) {
        setSelectedLots([...selectedLots, lotId]);
      } else {
        alert("You can select a maximum of 2 lots.");
      }
    } else {
      setSelectedLots(selectedLots.filter((id) => id !== lotId));
    }
  };
 
  const handleSampleChange = (e) => {
    const sampleId = e.target.value;
    if (e.target.checked) {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sampleId]);
      } else {
        alert("You can select a maximum of 2 samples.");
      }
    } else {
      setSelectedSamples(selectedSamples.filter((id) => id !== sampleId));
    }
  };
 
  const handleTestMethodChange = (e) => {
    setSelectedTestMethod(e.target.value);
  };
 
  const handleParameterChange = (e) => {
    setSelectedParameter(e.target.value);
  };
 
  const handleGenerateGraph = () => {
    if (!selectedTestMethod || !selectedParameter || selectedSamples.length === 0) {
      alert("Please select test method, parameter, and at least one sample.");
      return;
    }
 
    navigate("/graph-generator", {
      state: {
        selectedLots,
        selectedSamples,
        testMethod: selectedTestMethod,
        selectedParam: selectedParameter, // Use 'selectedParam' to match GraphGenerator.js
      },
    });
  };
 
  return (
    <motion.div className="product-selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="dropdown">
        <label htmlFor="product">Select Product</label>
        <select id="product" value={selectedProduct} onChange={handleProductChange}>
          <option value="">-- Select a Product --</option>
          {products.map((product, index) =>
            Object.keys(product).map((productId) => (
              <option key={index} value={productId}>
                {productId}
              </option>
            ))
          )}
        </select>
      </div>
 
      {lots.length > 0 && (
        <div className="dropdown">
          <label>Select Lots (Max: 2)</label>
          <div className="checkbox-group">
            {lots.map((lot) => (
              <label key={lot.lot_id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  value={lot.lot_id}
                  checked={selectedLots.includes(String(lot.lot_id))}
                  onChange={handleLotChange}
                />
                Lot ID: {lot.lot_id}
                <span
                  className="status-indicator"
                  style={{
                    display: "inline-block",
                    width: "25px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: lot.status === "YES" ? "green" : "red",
                  }}
                ></span>
              </label>
            ))}
          </div>
        </div>
      )}
 
      {samples.length > 0 && (
        <div className="dropdown">
          <label>Select Samples (Max: 2)</label>
          <div className="checkbox-group">
            {samples.map((sample) => (
              <label key={sample}>
                <input
                  type="checkbox"
                  value={sample}
                  checked={selectedSamples.includes(sample)}
                  onChange={handleSampleChange}
                />
                Sample ID: {sample}
                {/* <span
                  className="status-indicator"
                  style={{
                    display: "inline-block",
                    width: "25px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: .status === "YES" ? "green" : "red",
                  }}
                ></span> */}
              </label>
            ))}
          </div>
        </div>
      )}
 
      {Object.keys(testMethods).length > 0 && (
        <div className="dropdown">
          <label>Select Test Method</label>
          <select value={selectedTestMethod} onChange={handleTestMethodChange}>
            <option value="">-- Select Test Method --</option>
            {Object.keys(testMethods).map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      )}
 
      {parameters.length > 0 && (
        <div className="dropdown">
          <label>Select Parameter</label>
          <select value={selectedParameter} onChange={handleParameterChange}>
            <option value="">-- Select Parameter --</option>
            {parameters.map((param, index) => (
              <option key={index} value={param}>
                {param}
              </option>
            ))}
          </select>
        </div>
      )}
 
      <button onClick={handleGenerateGraph}>Generate Graph</button>
    </motion.div>
  );
};
 
export default ProductSelection;