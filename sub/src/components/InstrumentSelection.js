import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../CSS/ProductSelection.css";
import ProductSelection from "./ProductSelection";

const InstrumentSelection = () => {
  const [selectInstrument, setSelectedInstrument] = useState("");
  const [selectParameter, setSelectedParameter] = useState([]);
  const navigate = useNavigate();

  const handleParameter = (e) => {
    const param = e.target.value;

    if (e.target.checked) {
      setSelectedParameter([...selectParameter, param]);
    } else {
      setSelectedParameter(
        selectParameter.filter((element) => element !== param)
      );
    }
  };

  const handleInstrumentChange = (e) => {
    setSelectedInstrument(e.target.value);
  };

  // console.log(selectParameter)
  // console.log(selectParameter.length)

  const handleInstrumentGraph = () => {
    if (selectInstrument.length === 0) {
      alert("Please select an option.");
      return;
    }

    // Navigate to Lab X Instruments with selected data
    if (selectInstrument === "Lab X Instruments") {
      if (selectParameter.length < 2) {
        alert("Please select at least 2 parameters");
        return;
      }
      navigate("/Lab X Instruments", {
        state: selectParameter,
      });
    } else {
      navigate("/product-selection");
    }
  };

  return (
    <div className="p-12 min-h-screen">
    <motion.div
      className="product-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="dropdown">
        <label htmlFor="product">Select Options</label>
        <select
          id="product"
          value={selectInstrument}
          onChange={handleInstrumentChange}
        >
          <option value="">-- Select an Option --</option>

          <option>Lab CoA</option>
          <option>Lab X Instruments</option>
        </select>
      </div>

      {selectInstrument === "Lab X Instruments" && (
        <div className="mb-20 p-15 rounded-lg bg-[#ffffff1a] transition-opacity duration-[300ms]">
          <div className="pl-5 pt-5 pb-5 text-lg font-bold">
            Select the parameters
          </div>

          {/*<div className="px-auto pt-5 flex justify-center gap-x-20 pb-5">
            <div className="flex items-center">
              <input
                type="checkbox"
                value="/sys_product_sys_name_count"
                className="w-4 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleParameter}
              />
              <label className="text-sm font-bold">System products</label>
            </div>
            <div className="text-sm font-medium flex items-center">Vs</div>
            <div className="flex items-center">
              <label className="text-sm font-bold">System names</label> */}
            {/* </div>
          </div>
          </div> */}

          {/* <div className="px-auto pt-5 flex justify-center gap-x-20 pb-5">
            <div className="flex items-center">
              <input
                type="checkbox"
                value="/sys_product_method_count"
                className="w-4 h-5 mr-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleParameter}
              />
              <label className="ms-2 pl-2 text-sm font-bold">
              System products
              </label>
            </div>
            <div className="text-sm font-medium">Vs</div>
            <div class="flex items-center">
              <label className="ms-2 pl-2 text-sm font-bold">
              Methods
              </label>
            </div>
          </div> */}

<div className='relative flex flex-col w-full mb-3'>
        <table className='w-auto'>
            <tbody>
                <tr className='border border-solid border-l-0 border-r-0'>
                    <td className="px-6 pt-3"><input
                        type="checkbox"
                        value="table"
                        className="w-4 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleParameter}/>
                    </td>
                    <th className='px-6 py-3'>System Products</th>
                    <th className='px-6 py-3'>Vs</th>
                    <th className='px-6 py-3'>Count of Sample ID (Tabular)</th>
                </tr>
                <tr className='border border-solid border-l-0 border-r-0'>
                    <td className="px-6 pt-3"><input
                        type="checkbox"
                        value="/sys_name_vs_response_time_in_mins"
                        className="w-4 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleParameter}/>
                    </td>
                    <th className='px-6 py-3'>System Name</th>
                    <th className='px-6 py-3'>Vs</th>
                    <th className='px-6 py-3'>Average Response Time</th>
                </tr>
                <tr className='border border-solid border-l-0 border-r-0'>
                    <td className="px-6 pt-3"><input
                        type="checkbox"
                        value="/sys_name_vs_count_of_sample_id"
                        className="w-4 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleParameter}/>
                    </td>
                    <th className='px-6 py-3'>System Name</th>
                    <th className='px-6 py-3'>Vs</th>
                    <th className='px-6 py-3'>Count of Sample ID</th>
                </tr>
                <tr className='border border-solid border-l-0 border-r-0'>
                    <td className="px-6 pt-3"><input
                        type="checkbox"
                        value="/user_id_vs_count_of_sample_id"
                        className="w-4 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleParameter}/>
                    </td>
                    <th className='px-6 py-3'>User ID</th>
                    <th className='px-6 py-3'>Vs</th>
                    <th className='px-6 py-3'>Count of Sample ID</th>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
      )}

      <button onClick={handleInstrumentGraph}>View</button>
    </motion.div>
    </div>

  );
};

export default InstrumentSelection;
