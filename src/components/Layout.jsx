import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const title = {
    "/": "Home",
    "/services": "Book an Appointment",
    "/doctors": "Doctors",
    "/reviews": "Reviews",
    "/contact": "Contact",
    "/profile": "Profile",
  }[pathname] || "Smile Studio";

  return (
    <div className="app">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      <main className="main">
        <div className="header">
          <h2>{title}</h2>
        </div>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
