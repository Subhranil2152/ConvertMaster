import React from "react";

const Dropdown = ({ tests, setSelectedTest }) => {
  const handleChange = (event) => {
    setSelectedTest(event.target.value);
  };

  return (
    <div className="dropdown">
      <label htmlFor="test-select">Select a Test: </label>
      <select id="test-select" onChange={handleChange}>
        <option value="">--Choose a Test--</option>
        {tests.map((test, index) => (
          <option key={index} value={test}>
            {test}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
