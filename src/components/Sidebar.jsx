import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/",      icon: "🏠", label: "Home" },
  { to: "/services", icon: "🦷", label: "Services" },
  { to: "/doctors",  icon: "👨‍⚕️", label: "Doctors" },
  { to: "/reviews",  icon: "⭐", label: "Reviews" },
  { to: "/contact",  icon: "☎️", label: "Contact" },
  { to: "/profile",  icon: "👤", label: "Profile" },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <div className="circle" />
        <h1>Smile Studio</h1>
      </div>

      <button className="collapse-btn" onClick={onToggle}>
        {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      </button>

      <nav className="nav">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => isActive ? "active" : undefined}
          >
            <span className="icon" aria-hidden>{l.icon}</span>
            <span className="label">{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{marginTop:"auto", padding:"10px 14px", fontSize:12, color:"#94a3b8"}}>
        <span className="label">© {new Date().getFullYear()} Smile Studio</span>
      </div>
    </aside>
  );
}
