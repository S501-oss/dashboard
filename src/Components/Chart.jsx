import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import chartData from "../data/chartData.json";

export default function IndexLineChart({ data }) {
  const displayData = data && data.length ? data : chartData;

  return (
    <LineChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        maxWidth: 800,
        margin: "auto",
      }}
      data={displayData}
    >
      <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
      <XAxis dataKey="name" stroke="#666" />
      <YAxis stroke="#666" />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#8884d8"
        dot={{ fill: "#fff" }}
        activeDot={{ stroke: "#fff" }}
      />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#82ca9d"
        dot={{ fill: "#fff" }}
        activeDot={{ stroke: "#fff" }}
      />
      <Legend
        position="insideTopRight"
        offset={20}
        wrapperStyle={{
          border: "1px solid #e0e0e0",
          borderRadius: 5,
          padding: "1ex",
          background: "#fff",
        }}
      />
    </LineChart>
  );
}
