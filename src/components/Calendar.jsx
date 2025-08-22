import React, { useMemo, useState, useEffect } from "react";

function monthLabel(y, m){
  return new Date(y, m, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
}

export default function Calendar({ value, onChange }) {
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.getMonth());

  useEffect(() => {
    // if parent changes date externally, sync month view
    setViewYear(value.getFullYear());
    setViewMonth(value.getMonth());
  }, [value]);

  const { leading, days, trailing } = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const last  = new Date(viewYear, viewMonth + 1, 0);
    const leadCount = first.getDay(); // 0..6 (Sun..Sat)
    const trailCount = 6 - last.getDay();
    const lead = [];
    for(let i=leadCount; i>0; i--){
      const d = new Date(viewYear, viewMonth, 1 - i);
      lead.push(d);
    }
    const core = [];
    for(let d=1; d<=last.getDate(); d++){
      core.push(new Date(viewYear, viewMonth, d));
    }
    const tail = [];
    for(let i=1; i<=trailCount; i++){
      tail.push(new Date(viewYear, viewMonth + 1, i));
    }
    return { leading: lead, days: core, trailing: tail };
  }, [viewYear, viewMonth]);

  const isSameDay = (a,b) =>
    a.getFullYear()===b.getFullYear() &&
    a.getMonth()===b.getMonth() &&
    a.getDate()===b.getDate();

  return (
    <div className="calendar">
      <div className="top">
        <button onClick={()=>{
          const m = viewMonth - 1;
          const y = m < 0 ? viewYear - 1 : viewYear;
          setViewYear(y);
          setViewMonth((m+12)%12);
        }}>‹</button>
        <div style={{fontWeight:600}}>{monthLabel(viewYear, viewMonth)}</div>
        <button onClick={()=>{
          const m = viewMonth + 1;
          const y = m > 11 ? viewYear + 1 : viewYear;
          setViewYear(y);
          setViewMonth(m%12);
        }}>›</button>
      </div>

      <div className="grid">
        {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
          <div key={d} className="dow">{d}</div>
        ))}

        {leading.map(d => (
          <div key={`l${d.toDateString()}`} className="day muted">{d.getDate()}</div>
        ))}

        {days.map(d => (
          <div
            key={d.toDateString()}
            className={`day ${isSameDay(d, value) ? "selected" : ""}`}
            onClick={() => onChange(d)}
          >
            {d.getDate()}
          </div>
        ))}

        {trailing.map(d => (
          <div key={`t${d.toDateString()}`} className="day muted">{d.getDate()}</div>
        ))}
      </div>
    </div>
  );
}
