import React, { useMemo, useState } from "react";
import allDoctors from "../data/doctors.js";

const PER_PAGE = 6;

export default function Doctors(){
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(allDoctors.length / PER_PAGE);

  const slice = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return allDoctors.slice(start, start + PER_PAGE);
  }, [page]);

  return (
    <div>
      <div className="list">
        {slice.map(d => (
          <div key={d.id} className="item">
            <img src={d.avatar} alt={d.name}/>
            <div>
              <div className="name">{d.name}</div>
              <div style={{color:"var(--muted)"}}>{d.email}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pager">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        {Array.from({length: pageCount}).map((_,i)=>(
          <button
            key={i}
            className={page===i+1 ? "active" : ""}
            onClick={()=>setPage(i+1)}
          >{i+1}</button>
        ))}
        <button onClick={()=>setPage(p=>Math.min(pageCount,p+1))} disabled={page===pageCount}>Next</button>
      </div>
    </div>
  );
}
