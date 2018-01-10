"use strict";

_c_.verticalBarChart = {};
_c_.verticalBarChart.baseChart = {};

_c_.verticalBarChart.baseChart.create = function(options){

  var chart = {};
  chart.container = _c_.ChartObject.create('VBarChartContainer', options);
  if (!chart.build){
    chart.build = function(){
      return this.container.createElement();
    };
  }

  chart.title = chart.container.addNewChild('VBarChartTitle', options);
  if (options.titleOptions){
    chart.title.extendCss(options.titleOptions);
  }
  chart.graphContents = chart.container.addNewChild('VBarChartGraphContent', options);

  chart.xAxis = chart.graphContents.addNewChild('VBarChartXAxis', options);
  if (!chart.xAxis.addLabel){
    chart.xAxis.addLabel = function(text, options) {
      var xLabel = this.addNewChild('VBarChartXAxisLabel', options);
      xLabel.setText(text);
      return xLabel;
    };
  }

  chart.yAxis = chart.graphContents.addNewChild('VBarChartYAxis', options);
  if (!chart.yAxis.addLabel){
    chart.yAxis.addLabel = function(text, options){
      var yLabel = this.addNewChild('VBarChartYAxisLabel', options);
      yLabel.setText(text);
      return yLabel;
    };
  }
  if (!chart.yAxis.getLocationAsDecimal){
    chart.yAxis.getLocationAsDecimal = function(value){
      return (value - this.yMin) / (this.yMax - this.yMin);
    };
  }

  chart.barArea = chart.graphContents.addNewChild('VBarChartBarArea', options);

  if (!chart.clearData){
    chart.clearData = function(){
      this.barArea.clearChildren();
      this.xAxis.clearChildren();
    };
  }

  return chart;
};


_c_.verticalBarChart.baseChart.setYAxisNumbers = function(yOptions, options){
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
