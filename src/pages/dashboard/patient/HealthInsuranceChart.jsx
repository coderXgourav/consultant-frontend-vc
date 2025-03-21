import React from "react";
import Chart from "react-apexcharts";

const InsuranceClaimsChart = () => {
  const title = "Health Insurance Claims"; // Title of the chart
  const categories = ["Jan-Feb", "Mar-Apr", "May-June", "Jul-Aug", "Sep-Oct", "Nov-Dec"]; // X-axis categories
  const series = [
    {
      name: "Requested",
      data: [10, 20, 10, 15, 24, 12], // Data for Requested claims
    },
    {
      name: "Approved",
      data: [8, 16, 6, 10, 18, 8], // Data for Approved claims
    },
  ];
  const colors = ["#116aef", "#d0dfe9"]; // Colors for the bars (Requested and Approved)

  const options = {
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%", // Width of the bars
      },
    },
    stroke: {
      width: 0,
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
        right: 0,
        bottom: 10,
        left: 0,
      },
    },
    xaxis: {
      categories: categories, // Use hardcoded categories
    },
    yaxis: {
      labels: {
        show: false, // Hide the Y-axis labels
      },
    },
    colors: colors, // Use hardcoded colors
    markers: {
      size: 0,
      opacity: 0.3,
      colors: colors, // Marker colors match the series colors
      strokeColor: "#ffffff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default InsuranceClaimsChart;
