import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'A',
    uv: 400,
    pv: 240,
    amt: 2400,
  },
  {
    name: 'B',
    uv: 300,
    pv: 456,
    amt: 2400,
  },
  {
    name: 'C',
    uv: 300,
    pv: 139,
    amt: 2400,
  },
  {
    name: 'D',
    uv: 200,
    pv: 980,
    amt: 2400,
  },
  {
    name: 'E',
    uv: 278,
    pv: 390,
    amt: 2400,
  },
  {
    name: 'F',
    uv: 189,
    pv: 480,
    amt: 2400,
  },
];

// #endregion

export default function IndexLineChart() {
  return (
    <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} data={data}>
      <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
      <XAxis dataKey="name" stroke="#666" />
      <YAxis stroke="#666" />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#8884d8"
        dot={{ fill: '#fff' }}
        activeDot={{ stroke: '#fff' }}
      />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#82ca9d"
        dot={{ fill: '#fff' }}
        activeDot={{ stroke: '#fff' }}
      />
      <Legend
        position="insideTopRight"
        offset={20}
        wrapperStyle={{
          border: '1px solid #e0e0e0',
          borderRadius: 5,
          padding: '1ex',
          background: '#fff',
        }}
      />
    </LineChart>
  );
}