var drawBarChart = function(data, options, element){
  var dataSeries = DataSeries.makeFromBestGuess(data);
  var chart = createSimpleVerticalBarChart(options);
  chart.setDataSeries(dataSeries, options);

  htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};


var drawStackedBarChart = function(dataCluster, options, element){
  var chart = createStackedVerticalBarChart(options);
  chart.setDataCluster(dataCluster, options);

  htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};
