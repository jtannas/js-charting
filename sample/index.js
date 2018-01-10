"use strict";

/** Creates the chart samples
 */
$(document).ready(function(){

  // alias charting data objects
  var DataPoint = _c_.dataObjects.Point;
  var DataSeries = _c_.dataObjects.Series;
  var DataCluster = _c_.dataObjects.Cluster;

  // set default chart options
  var options = {
    title: 'Chart',
    titleOptions: {'font-size': '2em'},
    height: '500px',
    width: '500px'
  };
  var currentIdNumber = 1;

  // Example Chart: All positive, array input, no yAxis settings
  options.id = 'chart' + currentIdNumber++;
  drawBarChart([11, 22, 33, 44, 57], options, $('body'));

  // Example Chart: All negative, array input, no yAxis settings
  options.id = 'chart' + currentIdNumber++;
  options.units = '%';
  drawBarChart([-1, -2, -3, -4, -9], options, $('body'));

  // Example Chart: All positive, array input, clipped yAxis
  options.yAxis = {
    yMin: 10,
    yMax: 35,
    yLabelCount: 11
  };
  options.spacing = '10px';
  options.id = 'chart' + currentIdNumber++;
  drawBarChart([15, 20, 25], options, $('body'));

  // Example Chart: All negative, array input, yStep given
  options.yAxis = {
    yMin: -23,
    yMax: 5,
    yStep: 5
  };
  delete options.spacing;
  options.id = 'chart' + currentIdNumber++;
  drawBarChart([-15, -20, -5], options, $('body'));

  // Example Chart: Mixed Sign, array input, label count given
  options.yAxis = {
    yMin: -23,
    yMax: 5,
    yLabelCount: 10
  };
  options.id = 'chart' + currentIdNumber++;
  drawBarChart([-15, -20, 4], options, $('body'));

  // Example Chart: Making use of data objects for meta data
  var valueLabelCss = {'font-size': '0.5em'}
  var data = [
    DataPoint.new(-1, {name: 'a', css: {'background-color': 'red'}, valueLabelCss: valueLabelCss}),
    DataPoint.new(-2, {name: 'b', css: {'background-color': 'blue'}, valueLabelCss: valueLabelCss}),
    DataPoint.new(-3, {name: 'c', css: {'background-color': 'green'}, valueLabelCss: valueLabelCss}),
    DataPoint.new(4, {name: 'd', css: {'background-color': 'purple'}, valueLabelCss: valueLabelCss}),
    DataPoint.new(5, {name: 'e', css: {'background-color': 'yellow'}, valueLabelCss: valueLabelCss})
  ];
  options.id = 'chart' + currentIdNumber++;
  drawBarChart(data, options, $('body'));

  // Example Chart: Drawing a stacked chart
  options.yAxis = {
    yMax: 10,
    yStep: 2,
    yMin: -10
  };
  var dataCluster = DataCluster.new();
  dataCluster.pushDataSeries(DataSeries.makeFromDataPointArray(data, {name: 'a'}));
  dataCluster.pushDataSeries(DataSeries.makeFromNumericalArray([1, 2, 3], {name: 'b'}));
  dataCluster.pushDataSeries(DataSeries.makeFromNumericalArray([-1, -2, -3], {name: 'c'}));
  dataCluster.pushDataSeries(DataSeries.makeFromNumericalArray([1, -2, 3], {name: 'd'}));
  options.id = 'chart' + currentIdNumber++;
  drawBarChart(dataCluster, options, $('body'));
});

