import React, { useState } from "react";
import moment from "moment";

window.moment = moment; // must run before DateRangePicker import

import DateRangePicker from "react-bootstrap-daterangepicker";

export default function Calender({ onRangeChange }) {
  const [range, setRange] = useState({
    start: "2018-01-01",
    end: "2018-01-15",
  });

  const handleEvent = (event, picker) => {
    const start = picker.startDate.format("YYYY-MM-DD");
    const end = picker.endDate.format("YYYY-MM-DD");
    const newRange = { start, end };
    setRange(newRange);
    if (typeof onRangeChange === "function") onRangeChange(newRange);
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      <DateRangePicker
        initialSettings={{
          startDate: "01/01/2018",
          endDate: "01/15/2018",
          opens: "left",
        }}
        onApply={handleEvent}
      >
        <input type="text" className="form-control" style={{ width: 260 }} />
      </DateRangePicker>
    </div>
  );
}
