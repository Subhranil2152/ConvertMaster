import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
  } from "recharts";
  
  import { motion } from "framer-motion";
  
  const colors = ["#e9724d","#d6d727","#92cad1","#79ccb3","	#868686"];
  
  const BarChart5 = ({ data,heading1,heading2 }) => {
  
    return (
      <motion.div 
      initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
      className="m-3 border rounded-md shadow-md pt-12 h-96 flex flex-col"> 
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user_id"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="run_count"
              fill=""
              activeBar={<Rectangle fill="pink" stroke="blue"/>} label={{position:"top"}}>
                 {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
          <div className="text-center px-auto pb-8"><strong>{heading1}</strong> vs <strong>{heading2}</strong></div>
      </motion.div>
    );
  };
  
  export default BarChart5;