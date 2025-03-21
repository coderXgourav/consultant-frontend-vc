import React from "react";
import Chart from "react-apexcharts";

const MedicalExpensesChart = () => {
  const title = "Medical Expenses"; // Title of the chart
  const categories = ["Jan-Feb", "Mar-Apr", "May-June", "Jul-Aug", "Sep-Oct", "Nov-Dec"]; // X-axis categories
  const series = [
    {
      name: "Cash",
      data: [28, 15, 30, 18, 35, 13, 43], // Data for Cash
    },
    {
      name: "Card",
      data: [10, 39, 20, 36, 15, 32, 17], // Data for Card
    },
  ];
  const colors = ["#116aef", "#d0dfe9"]; // Colors for the lines (Cash and Card)

  const options = {
    chart: {
      height: 300,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    grid: {
      borderColor: "#d8dee6",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: 30,
        bottom: 10,
        left: 30,
      },
    },
    xaxis: {
      categories: categories, // Use hardcoded categories
    },
    colors: colors, // Use hardcoded colors
    yaxis: {
      show: false,
    },
    markers: {
      size: 0,
      opacity: 0.2,
      colors: colors, // Marker colors match the series colors
      strokeColor: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$" + val; // Format tooltip to show "$" before the value
        },
      },
    },
  };

  return (
    <div style={{ marginBottom: "30px" }}>
    
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
};

export default MedicalExpensesChart;
