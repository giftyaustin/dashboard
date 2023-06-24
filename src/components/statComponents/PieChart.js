import React from "react";
import "./pie.css";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const labels = ["Products", "Carts", "Users", "Posts"];
  const colors = ["#db6c4d", "#f0bf2e", "#80d96c", "#689cb0"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const percents = [30, 20, 40, 10];
  const meetings = [
    {
      title: "Meeting with suppliers from Kuta Bali",
      time: "14:00-15:00",
      location: "at Sunset Road, Kuta, Bali",
    },
    {
      title: "Check operation at Giga factory 1",
      time: "18:00-20:00",
      location: "at central Jakarta",
    },
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: colors,
        borderWidth: 0,
        data: percents,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="Pie">
      <div className="pie-block">
        <div className="top-statistics-text">
          Top statistics{" "}
          <select className="dropdown pie-dropdown">
            {months.map((c, i) => {
              return <option>{c}</option>;
            })}
          </select>
        </div>
        <div className="pie-stats-h">
          <div className="pie-chart-holder">
            <Pie data={data} options={chartOptions} />
          </div>
          <div className="pie-label-h">
            {labels.map((c, i) => {
              return (
                <div className="label-h">
                  <div className="color-text-h">
                    <div className="color-placer">
                      <div
                        className="label-color-h"
                        style={{ backgroundColor: colors[i] }}
                      ></div>
                    </div>
                    <div className="label-text">
                      {c}
                      <div className="percent-h">{percents[i]}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pie-block">
        <div className="top-statistics-text">
          Today's schedule{" "}
          <select className="dropdown pie-dropdown" style={{ opacity: 0.5 }}>
            <option>See all</option>
          </select>
        </div>
        <div className="meetings-block">
          {meetings.map((c,i)=>{return(<div className="meeting-h">
            <div className="title">{c.title}</div>
            <div className="time">{c.time}</div>
            <div className="location">{c.location}</div>
          </div>)})}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
