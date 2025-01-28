import React, { PureComponent } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const colors = ["#FF8042","#0088FE","#92cad1","#79ccb3","	#868686"];

const renderActiveShape = (props) => {


  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill}>
        {payload.sys_product}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Total sample count (${value})`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChart2 extends PureComponent {
  

  state = {
    activeIndex: 0,
  };

  
  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  
  render() {

    // const datakey = Object.keys(this.props.data[0])[0];
    let DataKey,heading;
    // let headings = []

    // for(const key in this.props.data[0]){
    //   if(typeof this.props.data[0].key === "number")
    //   {
    //     DataKey = key;
    //     break;
    //   } else {
    //     heading = key;
    //   }
    // }

    // const heading1 = this.props.data[0].heading
    // console.log(heading1)
    // const headings = this.props.data.map((item) => item.heading)
    
    return ((
  
    <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    className='m-3 pl-2 border rounded-md shadow-md h-96 flex flex-col'>
        <div className='flex justify-center pt-8 gap-x-2'>
            <strong>{this.props.heading1}</strong> VS <strong>{this.props.heading2}</strong>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.props.data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total_sample_count"
            onMouseEnter={this.onPieEnter}
          >
            {colors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </motion.div>
    ));
  }
}
