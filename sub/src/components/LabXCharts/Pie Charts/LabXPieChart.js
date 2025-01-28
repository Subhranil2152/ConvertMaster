import { PieChart, Pie, Cell } from "recharts"

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const LabXPieChart = ({heading1,heading2}) => {

  // const values = data.map()

  return (
    <div className="m-3 pl-2 border rounded-md shadow-md">
      <div className="pt-10 pl-10">
        <strong>{heading1}</strong>{"  "}VS{"  "}<strong>{heading2}</strong>
      </div>
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      
    </PieChart>
    </div>
  );
};

export default LabXPieChart;
