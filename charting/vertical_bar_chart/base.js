"use strict";

var createBaseBarChart = function(options){

  var chart = {};
  chart.container = ChartObject.create('BarChartContainer', options);
  if (!chart.build){
    chart.build = function(){
      return this.container.createElement();
    };
  }

  chart.title = chart.container.addNewChild('BarChartTitle', options);
  chart.graphContents = chart.container.addNewChild('BarChartGraphContent', options);

  chart.xAxis = chart.graphContents.addNewChild('BarChartXAxis', options);
  if (!chart.xAxis.addLabel){
    chart.xAxis.addLabel = function(text, options) {
      var xLabel = this.addNewChild('BarChartXAxisLabel', options);
      xLabel.setText(text);
      return xLabel;
    };
  }

  chart.yAxis = chart.graphContents.addNewChild('BarChartYAxis', options);
  if (!chart.yAxis.addLabel){
    chart.yAxis.addLabel = function(text, options){
      var yLabel = this.addNewChild('BarChartYAxisLabel', options);
      yLabel.setText(text);
      return yLabel;
    };
  }

  chart.barArea = chart.graphContents.addNewChild('BarChartBarArea', options);

  if (!chart.clearData){
    chart.clearData = function(){
      this.barArea.clearChildren();
      this.xAxis.clearChildren();
    };
  }

  return chart;
};


var constrainBetween = function(x, min, max){
  var result;
  if (x < min){
    result = min;
  } else if (x > max) {
    result = max;
  } else {
    result = x;
  }
  return result;
};


var setYAxisNumbers = function(yOptions, options){
  var isMinGiven = (yOptions.yMin !== undefined);
  var isMaxGiven = (yOptions.yMax !== undefined);
  var isStepGiven = (yOptions.yStep !== undefined);
  var isLabelCountGiven = (yOptions.yLabelCount !== undefined);

  if (isMinGiven && isMaxGiven && isStepGiven && isLabelCountGiven){
    throw 'Y-Axis is over-defined';
  } else if (isMinGiven && isMaxGiven && isStepGiven){
    this.yNumbers = linearAxisArray(yOptions.yMin, yOptions.yMax, yOptions.yStep);
  } else if (isMinGiven && isMaxGiven && isLabelCountGiven){
    this.yNumbers = linearArrayFromMinMaxLen(yOptions.yMin, yOptions.yMax, yOptions.yLabelCount);
  } else if (isMinGiven && isStepGiven && isLabelCountGiven){
    this.yNumbers = linearArrayFromMinStepLen(yOptions.yMin, yOptions.yStep, yOptions.yLabelCount);
  } else if (isMaxGiven && isStepGiven && isLabelCountGiven){
    this.yNumbers = linearArrayFromMaxStepLen(yOptions.yMax, yOptions.yStep, yOptions.yLabelCount);
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