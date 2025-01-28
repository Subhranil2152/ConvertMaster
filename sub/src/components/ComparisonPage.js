// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import "../CSS/ComparisonPage.css";
 
// const ComparisonPage = () => {
//   const [products, setProducts] = useState([]); // Store products fetched from server
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedLots, setSelectedLots] = useState([]);
//   const [graphData, setGraphData] = useState(null);
 
//   // Fetch data from Node.js server on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
// const response = await fetch("https://localhost:8080/products");
//         const data = await response.json();
//         setProducts(data.products);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
 
//     fetchData();
//   }, []);
 
//   // Handle Lot Selection
//   const handleLotSelection = (lotId, status) => {
// if (selectedLots.find((lot) => lot.id === lotId)) {
// setSelectedLots(selectedLots.filter((lot) => lot.id !== lotId));
//     } else if (selectedLots.length < 2) {
//       setSelectedLots([...selectedLots, { id: lotId, status }]);
//     } else {
//       alert("You cannot select more than 2 lots.");
//     }
//   };
 
//   // Generate Graph Data
//   const generateGraph = () => {
//     const lotsData = selectedProduct.lots.filter((lot) =>
// selectedLots.map((item) => item.id).includes(lot.lot_id)
//     );
//     setGraphData(lotsData);
//   };
 
//   return (
//     <div className="comparison-container">
//       {/* Product Dropdown */}
//       <motion.div className="dropdown-container">
//         <label>Select Product:</label>
//         <select
//           onChange={(e) =>
//             setSelectedProduct(
//               products.find((p) => p.product_id === parseInt(e.target.value))
//             )
//           }
//         >
//           <option value="">Select</option>
//           {products.map((product) => (
//             <option key={product.product_id} value={product.product_id}>
//               Product {product.product_id}
//             </option>
//           ))}
//         </select>
//       </motion.div>
 
//       {/* Lots Popup */}
//       {selectedProduct && (
//         <div className="lots-container">
//           <h3>Select Lots:</h3>
//           {selectedProduct.lots.map((lot) => (
//             <motion.div
//               key={lot.lot_id}
// className={`lot-card ${selectedLots.find((item) => item.id === lot.lot_id) ? "selected" : ""}`}
//               whileHover={{ scale: 1.05 }}
//               onClick={() => handleLotSelection(lot.lot_id, lot.samples[0].status)}
//             >
//               <span>Lot {lot.lot_id}</span>
//               <div
//                 className={`status-indicator ${
//                   lot.samples[0].status === "Pass" ? "pass" : "fail"
//                 }`}
//               ></div>
//             </motion.div>
//           ))}
//         </div>
//       )}
 
//       {/* Compare Button */}
//       {selectedLots.length === 2 && (
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           className="compare-button"
//           onClick={generateGraph}
//         >
//           Compare
//         </motion.button>
//       )}
 
//       {/* Graph */}
//       {graphData && (
//         <div className="graph-container">
//           <h3>Graph Results:</h3>
// <p>Graph for Lots {selectedLots.map((lot) => lot.id).join(" & ")}</p>
//           {graphData.map((lot) => (
//             <div key={lot.lot_id}>
//               <p>Lot {lot.lot_id}</p>
//               {lot.samples.map((sample) => (
//                 <p key={sample.sample_id}>
//                   Sample {sample.sample_id}: Result {sample.result} ({sample.status})
//                 </p>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default ComparisonPage;