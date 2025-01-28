import React, { useEffect, useState } from "react";
import Table from "./LabXCharts/Table";
import axios from "axios";
import LabXBarGraph from "./LabXCharts/Bar Charts/LabXBarGraph";
import { useLocation } from "react-router-dom";
import BarChart2 from "./LabXCharts/Bar Charts/BarChart2";
import BarCharts3 from "./LabXCharts/Bar Charts/BarCharts3";
import BarChart4 from "./LabXCharts/Bar Charts/BarChart4";
import BarChart5 from "./LabXCharts/Bar Charts/BarChart5";

// console.log(all_system_table_data());
// const ParametersArray = ["sys_product_method_count","sys_product_sys_sw_count","sys_product_user_count","sys_product_run_count","sys_product_run_state_count","distinct_sys_product_sample_count","sys_product_sys_name_count"]

const LabXPage = () => {
  
  const [tableData,setTableData] = useState([]);
  // const [dataValues,setDataValues] = useState([]);
  // const [barGraphValues,setBarGraphValues] = useState([]);
  const location = useLocation();

  const [barChart2,setBarChart2] = useState([]);
  const [barChart3,setBarChart3] = useState([]);
  const [barChart4,setBarChart4] = useState([]);
  // const [barChart5,setBarChart5] = useState([]);
 

  const data = location.state;
  console.log(data)

  useEffect(() => {

    axios.get("http://127.0.0.1:5000/distinct_sys_product_sample_count")
    .then((data)=>setTableData(data.data))

    // axios.get()
    // .then()
    for(const i of data){
      if(i === ("/sys_name_vs_response_time_in_mins"))
        axios.get("http://127.0.0.1:5000/sys_name_vs_response_time_in_mins").then(data => setBarChart2(data.data))

      if(i === ("/sys_name_vs_count_of_sample_id"))
        axios.get("http://127.0.0.1:5000/sys_name_vs_count_of_sample_id").then(data => setBarChart3(data.data))

      if(i === ("/user_id_vs_count_of_sample_id"))
        axios.get("http://127.0.0.1:5000/user_id_vs_count_of_sample_id").then(data => setBarChart4(data.data))

      // if(i === ("/user_id_vs_run_name"))
      //   axios.get("http://127.0.0.1:5000/user_id_vs_run_name").then(data => setBarChart5(data.data))
    }

    // axios.get("http://127.0.0.1:5000/sys_product_method_count").then(data => setBarGraphValues(data.data))

    // data.forEach((item) => 
    //   axios.get(`http://127.0.0.1:5000${item}`).then(data => setDataValues(prevDataValues => [...prevDataValues,data.data])))
  }, [data]);

  // console.log(barGraphValues)
  // console.log(dataValues[0])
  // console.log(data)

  // console.log(tableData)
  // console.log(barChart2)

  return (
    <>
    <div className="">
    <div className="flex flex-col relative w-full">
    <div className="grid grid-cols-2 gap-5">
      
      {data.length!==0 &&(
        data.map((item) => {
          if(item === "table")
            return <Table data={tableData}></Table>
          if(item === "/sys_name_vs_response_time_in_mins")
            return <BarChart2 heading1={"System Name"} heading2={"Average Response Time"} data={barChart2}/>
          if(item === "/sys_name_vs_count_of_sample_id")
            return <BarCharts3 data={barChart3} heading1={"System Name"} heading2={"Count of Sample ID"}></BarCharts3>
          if(item === "/user_id_vs_count_of_sample_id")
            return <BarChart4 data={barChart4} heading1={"User ID"} heading2={"Count of Sample ID"}></BarChart4>
          return <></>;
        })
      )}
    </div>
    </div>
    </div>
    </>
  );
};

export default LabXPage;
