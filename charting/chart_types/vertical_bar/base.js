"use strict";
/**
 * This is the base folder for the module upon which more complete bar
 * chart definitions are built. It provides default methods for the chart
 */


/** Namespace for the Vertical Bar Module */
_c_.verticalBarChart = {};

/** Namespace for the Vertical 'base chart' */
_c_.verticalBarChart.baseChart = {};


/** Function for creating the base bar chart */
_c_.verticalBarChart.baseChart.create = function(options){
  var baseChart = this;
  var chart = baseChart.createStructure(options);
  baseChart.applyDefaultMethods(chart);
  baseChart.applySupportedOptions(chart, options);
  return chart;
};


/** Function for creating a chart object */
_c_.verticalBarChart.baseChart.createStructure = function(options){
  var chart = {};
  chart.container = _c_.ChartObject.create('VBarChartContainer', options);
  chart.title = chart.container.addNewChild('VBarChartTitle', options);
  chart.graphContents = chart.container.addNewChild('VBarChartGraphContent', options);
  chart.xAxis = chart.graphContents.addNewChild('VBarChartXAxis', options);
  chart.yAxis = chart.graphContents.addNewChild('VBarChartYAxis', options);
  chart.barArea = chart.graphContents.addNewChild('VBarChartBarArea', options);
  return chart;
};


/** Function for applying the default methods to a chart object (no overides) */
_c_.verticalBarChart.baseChart.applyDefaultMethods = function(chart){
  var baseChart = this;
  if (!chart.build) { chart.build = baseChart.build; }
  if (!chart.clearData) { chart.clearData = baseChart.clearData; }
  if (!chart.styleBarExterior){ chart.styleBarExterior = baseChart.styleBarExterior; }
  if (!chart.styleBarData){ chart.styleBarData = baseChart.styleBarData; }
  if (!chart.xAxis.addLabel){ chart.xAxis.addLabel = baseChart.addXLabel; }
  if (!chart.yAxis.addLabel){ chart.yAxis.addLabel = baseChart.addYLabel; }
  if (!chart.yAxis.getLocationAsDecimal){ chart.yAxis.getLocationAsDecimal = baseChart.getYLocationAsDecimal; }
  if (!chart.yAxis.setYAxisNumbers){ chart.yAxis.setYAxisNumbers = baseChart.setYAxisNumbers; }
};


/** Function for applying 'special' options to the chart */
_c_.verticalBarChart.baseChart.applySupportedOptions = function(chart, options){
  if (options.height) { chart.container.setHeight(options.height); }
  if (options.id) { chart.container.setId(options.id); }
  if (options.title) { chart.title.setText(options.title); }
  if (options.titleOptions) { chart.title.extendCss(options.titleOptions); }
  if (options.width) { chart.container.setWidth(options.width); }
};


/** Default method for an overall Chart object to build itself into HTML */
_c_.verticalBarChart.baseChart.build = function(){
  var chart = this;
  return chart.container.createElement();
};


/** Default method for an overall Chart object to clear itself of data bars */
_c_.verticalBarChart.baseChart.clearData = function(){
  var chart = this;
  chart.barArea.clearChildren();
  chart.xAxis.clearChildren();
};


/** Default method for an xAxis to give itself a label. */
_c_.verticalBarChart.baseChart.addXLabel = function(text, options) {
  var chartXAxis = this;
  var xLabel = chartXAxis.addNewChild('VBarChartXAxisLabel', options);
  xLabel.setText(text);
  return xLabel;
};


/** Default method for a yAxis to give itself a label */
_c_.verticalBarChart.baseChart.addYLabel = function(text, options){
  var chartYAxis = this;
  var yLabel = chartYAxis.addNewChild('VBarChartYAxisLabel', options);
  yLabel.setText(text);
  return yLabel;
};


/** Default method for a yAxis to return the relative vertical position of a number */
_c_.verticalBarChart.baseChart.getYLocationAsDecimal = function(value){
  var chartYAxis = this;
  return (value - chartYAxis.yMin) / (chartYAxis.yMax - chartYAxis.yMin);
};


/** Default method for yAxis to set its number labels */
_c_.verticalBarChart.baseChart.setYAxisNumbers = function(options){

  var yOptions = (options.yAxis || this.yDefaults);

  var utils = _c_.utils.arrays;
  var isMinGiven = (yOptions.yMin !== undefined);
  var isMaxGiven = (yOptions.yMax !== undefined);
  var isStepGiven = (yOptions.yStep !== undefined);
  var isLabelCountGiven = (yOptions.yLabelCount !== undefined);

  if (isMinGiven && isMaxGiven && isStepGiven && isLabelCountGiven){
    throw 'Y-Axis is over-defined';
  } else if (isMinGiven && isMaxGiven && isStepGiven){
    this.yNumbers = utils.linearAxisArray(yOptions.yMin, yOptions.yMax, yOptions.yStep);
  } else if (isMinGiven && isMaxGiven && isLabelCountGiven){
    this.yNumbers = utils.linearArrayFromMinMaxLen(yOptions.yMin, yOptions.yMax, yOptions.yLabelCount);
  } else if (isMinGiven && isStepGiven && isLabelCountGiven){
    this.yNumbers = utils.linearArrayFromMinStepLen(yOptions.yMin, yOptions.yStep, yOptions.yLabelCount);
  } else if (isMaxGiven && isStepGiven && isLabelCountGiven){
    this.yNumbers = utils.linearArrayFromMaxStepLen(yOptions.yMax, yOptions.yStep, yOptions.yLabelCount);
    this.yNumbers.reverse();
  } else {
    throw 'Y-Axis is under-defined';
  }
  this.yMin = this.yNumbers[0];
  this.yMax = this.yNumbers[this.yNumbers.length - 1];
  this.yLabelCount = this.yNumbers.length;
  this.yStep = this.yNumbers[1] - this.yNumbers[0];

  var me = this;
  this.yNumbers.forEach(function(yNumber){
    var labelText = yNumber.toLocaleString() + (options.units || '');
    me.addLabel(labelText, options);
  });
};


/** Default method to apply styling and text to a stacked data bar */
_c_.verticalBarChart.baseChart.styleBarExterior = function(bar, options){
  var chart = this;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  bar.setWidth(decimalToPercentageText(chart.xAxis.barWidth));
  bar.setSpacing(options.spacing || '0');
};


/** Default method to apply styling and text to a data bar */
_c_.verticalBarChart.baseChart.styleBarData = function(bar, dataPoint, options){
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;

  var barValueLabel = bar.addNewChild('VBarChartBarValueLabel', options);
  var barText = dataPoint.value.toString() + (options.units || '');
  barValueLabel.setText(barText);

  if (dataPoint.css){ bar.extendCss(dataPoint.css); }
  if (dataPoint.valueLabelCss) { barValueLabel.extendCss(dataPoint.valueLabelCss); }
};
