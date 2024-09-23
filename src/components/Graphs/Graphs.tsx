import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";

const data = [
  {
    name: "Sat",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sun",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mon",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tue",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "wed",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Thurs",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Fri",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Graphs() {
  return (
    <div>
        <div>
        <h1 style={{ color: '#343C6A', fontSize: "20px", fontWeight: "bold" ,margin:'2%'}}> Purchase Graphs</h1>

        </div>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="uv"
        fill="#797FE7"
        // activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="pv"
        fill="#C8CBFF"
        // activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
    </div>

  );
}