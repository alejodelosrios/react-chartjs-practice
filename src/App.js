import React, { useState } from "react";
import Chart from "./components/Chart";
import axios from "axios";
import styles from "./css/App.module.css";
import Switch from "react-switch";

function App() {
  const [data, setData] = useState([]);
  const [oneChart, setOneChart] = useState(false);
  const [barChart, setBarChart] = useState(false);
  const [token, setToken] = useState(
    "01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788"
  );
  const [userSeries, setUserSeries] = useState("SM1282,SM925");

  const handleChange = (nextChecked) => {
    setOneChart(nextChecked);
  };
  const toggleChartType = (nextChecked) => {
    setBarChart(nextChecked);
  };

  // Get oneChart Title
  const titles = [];
  for (const dataset of data) {
    titles.push(dataset.titulo);
  }
  const chartTitle = titles.join(" - ");

  async function fetch(seriesId) {
    try {
      var {
        data: {
          bmx: { series },
        },
      } = await axios.get(
        `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${seriesId}?token=${token}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setData(series);
    } catch (e) {
      /* handle error */
      console.log("Hubo error en la conexión");
    }
  }

  return (
    <div className={styles.container}>
      <h1>Banxico API Visualizer - Tukan Challenge</h1>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="token">Token</label>
          <input
            value={token}
            type="text"
            placeholder="Please enter your Banxico Token"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="userSeries">Series</label>
          <input
            value={userSeries}
            type="text"
            onChange={(e) => setUserSeries(e.target.value)}
          />
        </div>
        <div className={styles.switchGroup}>
          <label htmlFor="onChart">View series on one chart</label>
          <Switch
            onChange={handleChange}
            checked={oneChart}
            onColor="#25C7BC"
            onHandleColor="#fff"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={16}
            width={36}
            className="react-switch"
            id="material-switch"
          />
        </div>
        <div className={styles.switchGroup}>
          <label htmlFor="onChart">Bar chart</label>
          <Switch
            onChange={toggleChartType}
            checked={barChart}
            onColor="#25C7BC"
            onHandleColor="#fff"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={16}
            width={36}
            className="react-switch"
            id="material-switch"
          />
        </div>
        <button
          className={styles.container__cta}
          onClick={() => fetch(userSeries)}
        >
          Fetch
        </button>
      </div>

      <div className={styles.cardContainer}>
        {!oneChart
          ? data.length > 0
            ? data.map((chart) => (
                <div key={chart.idSerie} className={styles.card}>
                  <Chart
                    datasets={chart}
                    oneChart={oneChart}
                    barChart={barChart}
                    chartTitle={chart.titulo}
                  />
                </div>
              ))
            : null
          : data.length > 0 && (
              <div className={styles.card}>
                <Chart
                  datasets={data}
                  oneChart={oneChart}
                  barChart={barChart}
                  chartTitle={chartTitle}
                />
              </div>
            )}
      </div>
    </div>
  );
}

export default App;
