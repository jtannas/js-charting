"use strict";

/** Namespace for simple vertical bar charts */
_c_.verticalBarChart.simpleChart = {};


/** Method to generate an HTML object from a dataset, options, and a parent element */
_c_.draw.simpleVerticalBarChart = function(data, options, parent){
  var dataSeries = _c_.dataObjects.Series.makeFromBestGuess(data);
  var chart = _c_.verticalBarChart.simpleChart.create(options);
  chart.populateXAxis(dataSeries, options);
  chart.populateYAxis(dataSeries, options);
  chart.populateBarArea(dataSeries, options);

  var htmlGraph = chart.build();
  if (parent) { parent.append(htmlGraph); }
  return htmlGraph;
};


/** Method to create the base structure of the bar chart */
_c_.verticalBarChart.simpleChart.create = function(options){
  var simpleChart = this;
  var chart = _c_.verticalBarChart.baseChart.create(options);
  simpleChart.applyDefaultMethods(chart);
  return chart;
};


/** Apply the default methods */
_c_.verticalBarChart.simpleChart.applyDefaultMethods = function(chart){
  var simpleChart = this;
  if (!chart.populateYAxis){ chart.populateYAxis = simpleChart.populateYAxis; }
  if (!chart.populateXAxis){ chart.populateXAxis = simpleChart.populateXAxis; }
  if (!chart.populateBarArea){ chart.populateBarArea = simpleChart.populateBarArea; }
  if (!chart.setYDefaults){ chart.setYDefaults = simpleChart.setYDefaults; }
  if (!chart.setBarPosition){ chart.setBarPosition = simpleChart.setBarPosition; }
};


/** Default method to calculate and set the yAxis default values */
_c_.verticalBarChart.simpleChart.setYDefaults = function(dataSeries){
  var chart = this;
  chart.yAxis.yDefaults = {
    yMax: Math.max(dataSeries.maxValue(), 0),
    yMin: Math.min(dataSeries.minValue(), 0),
    yLabelCount: 6
  };
};


/** Default method to set the xAxis from a data series */
_c_.verticalBarChart.simpleChart.populateXAxis = function(dataSeries, options){
  var chart = this;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  chart.xAxis.barWidth = 1 / dataSeries.length();

  dataSeries.dataPoints.forEach(function(dataPoint){
    var labelText = dataPoint.name || dataPoint.value.toLocaleString();
    var xLabel = chart.xAxis.addLabel(labelText, options);
    xLabel.setWidth(decimalToPercentageText(chart.xAxis.barWidth));
  });
};


/** Default method to calculate and set the yAxis from a data series */
_c_.verticalBarChart.simpleChart.populateYAxis = function(dataSeries, options){
  var chart = this;
  chart.setYDefaults(dataSeries);
  chart.yAxis.setYAxisNumbers(options);
  chart.yAxis.yZero = chart.yAxis.getLocationAsDecimal(0);
};


/** Default method to populate the chart from a data series object */
_c_.verticalBarChart.simpleChart.populateBarArea = function(dataSeries, options){
  var chart = this;
  dataSeries.dataPoints.forEach(function(dataPoint){
    var bar = chart.barArea.addNewChild('VBarChartSingleBar', options);
    chart.setBarPosition(bar, dataPoint, options);
    chart.styleBarExterior(bar, options);
    chart.styleBarData(bar, dataPoint, options);
  });
};


/** Default method to set the position of a data bar */
_c_.verticalBarChart.simpleChart.setBarPosition = function(bar, dataPoint, options){
  var chart = this;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  var constrainBetween = _c_.utils.numbers.constrainBetween;

  var yData = chart.yAxis.getLocationAsDecimal(dataPoint.value);

  var yBarStart = constrainBetween(chart.yAxis.yZero, 0, 1);
  var yBarEnd = constrainBetween(yData, 0, 1);

  var yBarBottom = Math.min(yBarStart, yBarEnd);
  var yBarTop = Math.max(yBarStart, yBarEnd);
  var yBarHeight = yBarTop - yBarBottom;

  bar.setHeight(decimalToPercentageText(yBarHeight));
  bar.setBottom(decimalToPercentageText(yBarBottom));
};


/** Default method to apply styling and text to a data bar */
_c_.verticalBarChart.simpleChart.styleBar = function(bar, dataPoint, options){
  var chart = this;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;

  bar.setWidth(decimalToPercentageText(chart.xAxis.barWidth));
  bar.setSpacing(options.spacing || '0');

  var barValueLabel = bar.addNewChild('VBarChartBarValueLabel', options);
  var barText = dataPoint.value.toString() + (options.units || '');
  barValueLabel.setText(barText);

  if (dataPoint.css){ bar.extendCss(dataPoint.css); }
  if (dataPoint.valueLabelCss) { barValueLabel.extendCss(dataPoint.valueLabelCss); }
};
