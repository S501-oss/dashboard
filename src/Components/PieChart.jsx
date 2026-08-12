import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import pieTransactions from "../data/pieData.json";

// 2. Custom Hex Colors for Slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const aggregateTransactions = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    const key = t.group || t.name;
    map[key] = (map[key] || 0) + (t.value || 0);
  });
  return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
};

// 3. Custom label with bent connector line (like the reference image)
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 8) * cos;
  const sy = cy + (outerRadius + 8) * sin;
  const mx = cx + (outerRadius + 28) * cos;
  const my = cy + (outerRadius + 28) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 18;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={COLORS[index % COLORS.length]}
        fill="none"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={13}
        dominantBaseline="central"
      >
        {`${name}, ${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};
export default function AppPieChart({ data }) {
  const displayData =
    data && data.length ? data : aggregateTransactions(pieTransactions);
  const total = displayData.reduce((sum, d) => sum + (d.value || 0), 0);

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={displayData}
            cx="50%"
            cy="50%"
            innerRadius={80} // creates the donut hole
            outerRadius={130}
            paddingAngle={3} // gap between slices (the "exploded" look)
            labelLine={false}
            label={renderCustomLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {displayData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Center text overlay */}
          <text x="50%" y="46%" textAnchor="middle" fontSize={13} fill="#666">
            Total
          </text>
          <text x="50%" y="52%" textAnchor="middle" fontSize={13} fill="#666">
            value:
          </text>
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontSize={16}
            fontWeight="bold"
            fill="#222"
          >
            {total}
          </text>

          <Tooltip />
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
