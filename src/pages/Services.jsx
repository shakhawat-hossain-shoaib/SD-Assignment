import React, { useMemo, useState } from "react";
import Calendar from "../components/Calendar.jsx";

const services = ["Teeth Whitening", "Root Canal", "Dental Checkup", "Braces Consultation"];
const doctors  = ["Dr. Anika Rahman", "Dr. Farhan Ahmed", "Dr. Nabila Noor", "Dr. Omar Siddiq"];

const baseSlots = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM",
];
// Just to show some disabled times like the screenshot
const disabledSet = new Set(["12:00 PM","5:30 PM"]);

export default function Services(){
  const [service, setService] = useState(services[0]);
  const [doctor, setDoctor] = useState(doctors[0]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:30 AM");

  const dayLabel = useMemo(() =>
    date.toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }),
  [date]);

  const confirm = () => {
    alert(`Booked:
Service: ${service}
Doctor: ${doctor}
Date: ${dayLabel}
Time: ${time}`);
  };

  return (
    <div className="card" style={{padding:20}}>
      {/* Top selects */}
      <div className="row" style={{marginBottom:16}}>
        <div style={{flex:1}}>
          <label className="small">Service</label>
          <select className="select" value={service} onChange={e=>setService(e.target.value)}>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{flex:1}}>
          <label className="small">Doctor</label>
          <select className="select" value={doctor} onChange={e=>setDoctor(e.target.value)}>
            {doctors.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Calendar */}
      <Calendar value={date} onChange={setDate} />

      {/* Times */}
      <div style={{marginTop:22, marginBottom:8, fontWeight:600}}>
        Available Times on {dayLabel}
      </div>

      <div className="times" style={{marginBottom:16}}>
        {baseSlots.map(s => {
          const disabled = disabledSet.has(s);
          const selected = s === time;
          return (
            <button
              key={s}
              className={`slot ${selected ? "selected" : ""}`}
              disabled={disabled}
              onClick={()=> setTime(s)}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div style={{display:"flex", justifyContent:"flex-end"}}>
        <button
          onClick={confirm}
          style={{
            height:44, padding:"0 16px", background:"var(--brand)", color:"#fff",
            border:"none", borderRadius:12, cursor:"pointer", fontWeight:600
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
