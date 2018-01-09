"use strict";

$(document).ready(function(){
  var options = {
    title: 'Chart',
    height: '500px'
  };
  drawBarChart([11, 22, 33, 44, 57], options, $('body'));
  drawBarChart([-1, -2, -3, -4, -9], options, $('body'));


  options.yAxis = {
    yMin: 10,
    yMax: 35,
    yLabelCount: 11
  };
  drawBarChart([15, 20, 25], options, $('body'));

  options.yAxis = {
    yMin: -23,
    yMax: 5,
    yStep: 5
  };
  drawBarChart([-15, -20, -5], options, $('body'));

  options.yAxis = {
    yMin: -23,
    yMax: 5,
    yLabelCount: 10
  };
  drawBarChart([-15, -20, 4], options, $('body'));

  var data = [
    DataPoint.new(-1, {name: 'a', 'background-color': 'red'}),
    DataPoint.new(-2, {name: 'b', 'background-color': 'blue'}),
    DataPoint.new(-3, {name: 'c', 'background-color': 'green'}),
    DataPoint.new(4, {name: 'd', 'background-color': 'purple'}),
    DataPoint.new(5, {name: 'e', 'background-color': 'yellow'})
  ];

  options.id = 'chart4';
  drawBarChart(data, options, $('body'));

  options.yAxis = {
    yMax: 10,
    yStep: 2,
    yMin: -10
  };
  var dataCluster = new DataCluster();
  dataCluster.pushDataSeries(DataSeries.makeFromDataPointArray(data));
  dataCluster.pushDataSeries(DataSeries.makeFromNumericalArray([1, 2, 3]));
  dataCluster.pushDataSeries(DataSeries.makeFromNumericalArray([-1, -2, -3]));
  dataCluster.pushDataSeries(DataSeries.makeFromNumericalArray([1, -2, 3]));
  drawBarChart(dataCluster, options, $('body'));
});

