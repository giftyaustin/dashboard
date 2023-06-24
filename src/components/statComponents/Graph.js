import React, { useEffect, useState } from "react";
import "./graph.css";
// ./components/LineChart.js

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Graph = () => {
  const [data, setData] = useState();
  const [labels, setLabels] = useState();
  const [months, setMonths] = useState();
  const [sm, setSm] = useState(0);
  const [graphData, setGraphData] = useState();
  const [currLabels, setCurrLabels] = useState();
  const [currPoints, setCurrPoints] = useState();
  const [ap, setAp] = useState();
  const [tg, setTg] = useState();
  const dataArray = [];
  const fetchData = async () => {
    const response = await fetch(
      "https://data.covid19india.org/v4/min/timeseries.min.json"
    );
    const res = await response.json();
    dataArray.push(res.AP);
    dataArray.push(res.TG);
    setData(dataArray);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      const tempLabels = Object.keys(data[0].dates);
      const labelArray = [];
      for (const c of tempLabels) {
        const tempDate = new Date(c);

        if (tempDate.getFullYear() === 2021) {
          labelArray.push(c);
        }
      }
      setLabels(labelArray);
    }
  }, [data]);

  useEffect(() => {
    if (labels) {
      const apPoints = [];

      for (let i = 0; i < labels.length; i++) {
        apPoints.push(data[0].dates[labels[i]].total.confirmed);
      }
      setAp(apPoints);
      const tgPoints = [];
      for (let i = 0; i < labels.length; i++) {
        tgPoints.push(data[1].dates[labels[i]].total.confirmed);
      }
      setTg(tgPoints);
    }
  }, [labels]);
  useEffect(() => {
    const monthArray = [];
    if (labels) {
      labels.map((c, i) => {
        const temp = new Date(c);
        if (
          !monthArray.includes(temp.toLocaleString("en-US", { month: "long" }))
        ) {
          monthArray.push(temp.toLocaleString("en-US", { month: "long" }));
        }
      });
      setMonths(monthArray);
    }
  }, [labels]);
  useEffect(() => {
    const data1 = {
      labels: currLabels,
      datasets: [
        {
          label: "Andhra Pradesh",
          backgroundColor: "rgb(0, 99, 132)",
          borderColor: "rgb(0, 99, 132)",
          data: currPoints,
          lineTension: 0,
          borderWidth: 2,
          pointRadius: 0,
        },
        {
          label: "other",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data:
            currPoints &&
            currPoints.map((c) => {
              const min = 1000;
              const max = 2000;
              const randomInteger =
                Math.floor(Math.random() * (max - min + 1)) + min;
              return c + randomInteger;
            }),
          lineTension: 0,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    };
    setGraphData(data1);
  }, [sm, currLabels, currPoints]);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    }
  };

  useEffect(() => {
    if (labels) {
      setCurrLabels(
        labels.filter((c, i) => {
          const temp = new Date(c);
          return temp.getMonth() === sm;
        })
      );
    }
  }, [labels, sm]);

  const changeMonth = (e) => {
    setSm(e.target.selectedIndex);
  };

  useEffect(() => {
    if (ap) {
      setCurrPoints(
        ap.filter((c, i) => {
          const temp = new Date(labels[i]);
          return temp.getMonth() === sm;
        })
      );
    }
  }, [sm, ap, tg, labels]);

  return (
    <div className="Graph">
      <div className="cases-text">
        Cases 2021{" "}
        <div className="graph-labels">
          <div className="graph-label-h"><div className="g-label-color ap-color"></div>
          <div className="g-label-name">Andhra Pradesh</div></div>
          <div className="graph-label-h"><div className="g-label-color other-color"></div>
          <div className="g-label-name">Others</div></div>
        </div>
      </div>
      {months && (
        <select
          className="dropdown"
          onChange={(e) => {
            changeMonth(e);
          }}
        >
          {months.map((c, i) => {
            return <option key={i}>{c}</option>;
          })}
        </select>
      )}
      {graphData && <Line data={graphData} options={chartOptions} />}
    </div>
  );
};

export default Graph;
