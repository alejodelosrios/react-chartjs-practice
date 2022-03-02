import React, { useCallback, useRef } from "react";
import { colors } from "../utils/colors";
import { setLineChartData, setLineChartsData } from "../utils/setChartData";
import styles from "../css/Chart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({ datasets, oneChart, barChart, chartTitle }) => {
  let ref = useRef(null);
  const chartLabels = [];
  let userDatasets;

  const downloadChart = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);

  // Line Chart configs
  const options = {
    responsive: true,
    fill: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 24,
        },
      },
    },
  };

  // Formatting chart data
  if (oneChart) {
    datasets[0].datos.map((dato) => chartLabels.push(dato.fecha));
    userDatasets = setLineChartData(datasets, colors);
  } else {
    datasets.datos.map((dato) => chartLabels.push(dato.fecha));
    userDatasets = setLineChartsData(datasets, colors, chartLabels);
  }

  const data = {
    labels: chartLabels,
    datasets: userDatasets,
  };

  return (
    <div style={{ width: "100%" }}>
      {!barChart ? (
        <>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              type="button"
              onClick={downloadChart}
            >
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z" />
              </svg>
            </button>
          </div>
          <Line ref={ref} options={options} data={data} />
        </>
      ) : (
        <>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              type="button"
              onClick={downloadChart}
            >
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z" />
              </svg>
            </button>
          </div>
          <Bar ref={ref} options={options} data={data} />
        </>
      )}
    </div>
  );
};

export default Chart;
