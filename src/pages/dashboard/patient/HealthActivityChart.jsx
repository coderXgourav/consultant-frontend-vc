import React from "react";
import Chart from "react-apexcharts";

const HealthActivityChart = () => {
  const options = {
    series: [
      {
        name: "Health Activity",
        data: [80, 50, 30, 40, 90, 20], // Activity data (Walking, Sleeping, etc.)
      },
    ],
    chart: {
      height: 350,
      type: "radar",
      toolbar: {
        show: false, // Disable the toolbar
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    yaxis: {
      stepSize: 20, // Step size for the Y-axis
    },
    colors: ["#116aef", "#ced1d8"], // Colors for the radar chart
    xaxis: {
      categories: [
        "Walking", "Sleeping", "Yoga", "Gym", "Playing", "Swimming", // Categories on the X-axis
      ],
    },
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Health Activity Overview</h3> {/* Title for the chart */}
      <Chart options={options} series={options.series} type="radar" height={350} />
    </div>
  );
};

export default HealthActivityChart;
