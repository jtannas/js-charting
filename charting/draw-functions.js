"use strict";

var drawSimpleVerticalBarChart = function(data, options, element){
  var dataSeries = _c_.dataObjects.Series.makeFromBestGuess(data);
  var chart = _c_.verticalBarChart.simpleChart.create(options);
  chart.setDataSeries(dataSeries, options);

  var htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};

var drawStackedVerticalBarChart = function(dataCluster, options, element){
  var chart = _c_.verticalBarChart.stackedChart.create(options);
  chart.setDataCluster(dataCluster, options);

  var htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};

var drawBarChart = function(data, options, element){
  if (data instanceof _c_.dataObjects.Cluster){
    return drawStackedVerticalBarChart(data, options, element);
  } else {
    return drawSimpleVerticalBarChart(data, options, element);
  }
};
