"use strict";

var drawSimpleVerticalBarChart = function(data, options, element){
  var dataSeries = DataSeries.makeFromBestGuess(data);
  var chart = _c_.vertical_bar_chart.simpleChart.create(options);
  chart.setDataSeries(dataSeries, options);

  var htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};

var drawStackedVerticalBarChart = function(dataCluster, options, element){
  var chart = _c_.vertical_bar_chart.stackedChart.create(options);
  chart.setDataCluster(dataCluster, options);

  var htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};

var drawBarChart = function(data, options, element){
  if (data instanceof DataCluster){
    return drawStackedVerticalBarChart(data, options, element);
  } else {
    return drawSimpleVerticalBarChart(data, options, element);
  }
};
