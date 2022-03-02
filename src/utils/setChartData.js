export const setLineChartData = (datasets, colors) => {
  const userDatasets = [];
  // Data
  datasets.map((chart, index) => {
    let chartData = [];
    chart.datos.map((dato) => chartData.push(dato.dato));
    userDatasets.push({
      label: chart.idSerie,
      tension: 0.3,
      data: chartData,
      borderColor: colors[index].plainColor,
      backgroundColor: colors[index].opacityColor,
      pointBackgroundColor: colors[index].plainColor,
      borderWidth: 1,
    });
  });
  return userDatasets;
};

export const setLineChartsData = (datasets, colors) => {
  const userDatasets = [];
  // Data
  let chartData = [];
  datasets.datos.map((dato) => chartData.push(dato.dato));
  userDatasets.push({
    label: datasets.idSerie,
    tension: 0.3,
    data: chartData,
    borderColor: colors[1].plainColor,
    backgroundColor: colors[1].opacityColor,
    pointBackgroundColor: colors[1].plainColor,
    borderWidth: 1,
  });
  return userDatasets;
};
