import React, { useMemo, useState } from "react";
import "./App.css";
import Chart from "./Components/Chart";
import AppPieChart from "./Components/PieChart";
import Calender from "./Components/Calender";
import chartData from "./data/chartData.json";
import pieTransactions from "./data/pieData.json";

const parseDate = (s) => {
  // assume ISO YYYY-MM-DD
  return new Date(s + "T00:00:00");
};

const filterByRange = (items, start, end, key = "date") => {
  const s = parseDate(start);
  const e = parseDate(end);
  return items.filter((it) => {
    const d = parseDate(it[key]);
    return d >= s && d <= e;
  });
};

const aggregateTransactions = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    const key = t.group || t.name;
    map[key] = (map[key] || 0) + (t.value || 0);
  });
  return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
};

const App = () => {
  const [range, setRange] = useState({
    start: "2018-01-01",
    end: "2018-12-31",
  });

  const filteredChart = useMemo(
    () => filterByRange(chartData, range.start, range.end, "date"),
    [range],
  );

  const filteredPie = useMemo(() => {
    const tx = filterByRange(pieTransactions, range.start, range.end, "date");
    return aggregateTransactions(tx);
  }, [range]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-left">
        <div className="calendar-section">
          <Calender onRangeChange={setRange} />
        </div>

        <section className="dashboard-panel dashboard-panel--compact">
          <h2 className="dashboard-panel__title">Overview</h2>
          <AppPieChart data={filteredPie} />
        </section>
      </div>

      <div className="dashboard-right">
        <section className="dashboard-panel dashboard-panel--main">
          <h2 className="dashboard-panel__title">Sales chart</h2>
          <Chart data={filteredChart} />
        </section>
      </div>
    </div>
  );
};

export default App;
