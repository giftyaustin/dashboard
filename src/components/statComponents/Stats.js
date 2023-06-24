import React, { useEffect, useState } from "react";
import "./stats.css";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const updatedState = [];
  const statsItems = ["products", "carts", "users", "posts"];
  const menuItems = [
    "Dashboard",
    "Transactions",
    "Users",
    "Schedules",
    "Settings",
  ];
  const fetchStats = async () => {
    for (const c of statsItems) {
      const url = `https://dummyjson.com/${c}`;
      const response = await fetch(url);
      const res = await response.json();
      updatedState.push({ [c]: res[c].length });
    }
    setStats(updatedState);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="Stats">
      {stats.map((c, i) => {
        return (
          <div key={i} className="stat-box">
            <div className="stat-icon-h">
              <div className="icon-h">
                <img
                  className="stat-icon"
                  src={require(`../../images/${menuItems[i]}.png`)}
                  alt=""
                />
              </div>
            </div>
            <div className="stat-h">
              <div className="stat-name">Total {Object.keys(c)[0]}</div>
              <div className="stat-number">{c[Object.keys(c)[0]]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
