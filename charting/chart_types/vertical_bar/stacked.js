"use strict";

/** Namespace for simple vertical bar charts */
_c_.verticalBarChart.stackedChart = {};


/** Method to generate an HTML object from a dataset, options, and a parent element */
_c_.draw.stackedVerticalBarChart = function(dataCluster, options, parent){
  var chart = _c_.verticalBarChart.stackedChart.create(options);
  chart.populateXAxis(dataCluster, options);
  chart.populateYAxis(dataCluster, options);
  chart.populateBarArea(dataCluster, options);

  var htmlGraph = chart.build();
  if (parent) { parent.append(htmlGraph); }
  return htmlGraph;
};


/** Method to create the base structure of the bar chart */
_c_.verticalBarChart.stackedChart.create = function(options){
  var chart = _c_.verticalBarChart.baseChart.create(options);
  this.applyDefaultMethods(chart);
  return chart;
};


/** Apply the default methods */
_c_.verticalBarChart.stackedChart.applyDefaultMethods = function(chart){
  var stackedChart = this;
  if (!chart.getMinStackHeight){ chart.getMinStackHeight = stackedChart.getMinStackHeight; }
  if (!chart.getMaxStackHeight){ chart.getMaxStackHeight = stackedChart.getMaxStackHeight; }
  if (!chart.populateYAxis){ chart.populateYAxis = stackedChart.populateYAxis; }
  if (!chart.populateXAxis){ chart.populateXAxis = stackedChart.populateXAxis; }
  if (!chart.populateBarArea){ chart.populateBarArea = stackedChart.populateBarArea; }
  if (!chart.setOuterBarPosition){ chart.setOuterBarPosition = stackedChart.setOuterBarPosition; }
  if (!chart.setYDefaults){ chart.setYDefaults = stackedChart.setYDefaults; }
  if (!chart.setBarPosition){ chart.setBarPosition = stackedChart.setBarPosition; }
  if (!chart.styleBar){ chart.styleBar = stackedChart.styleBar; }
};

/**
 * Default method for populating a bar chart from its data series
 *
 * Note: Could use some refactoring, but it's surprisingly difficult to untangle
 * the positive and negative sections
 */
_c_.verticalBarChart.stackedChart.populateBarArea = function(dataCluster, options){
  var chart = this;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  var constrainBetween = _c_.utils.numbers.constrainBetween;
  var sumIf = _c_.utils.arrays.sumIf;

  dataCluster.dataSerieses.forEach(function(dataSeries){
    // Create the Outer Bar
    var outerBar = chart.barArea.addNewChild('VBarChartStackedBar', options);
    chart.setOuterBarPosition(outerBar, dataSeries, options);
    chart.styleBarExterior(outerBar, options);

    // Negative points stack downwards below the zero line
    // Positive points stack upwards from the zero line
    // They are placed in separate sub-bars to allow for separate css classes
    var values = dataSeries.dataPoints.map(function(x){ return x.value; });
    var sumNegative = sumIf(values, function(x){ return x < 0; });
    var sumPositive = sumIf(values, function(x){ return x > 0; });
    var barAbsSum = sumPositive - sumNegative;

    // Create a positive section scaled to its total
    var positivePortion = sumPositive / barAbsSum;
    var positiveBarsSection = outerBar.addNewChild('VBarChartStackedPositiveBarSection', options);
    positiveBarsSection.setHeight(decimalToPercentageText(positivePortion));

    // Populate the positive section with interior scaling on its data
    var positiveDataPoints = dataSeries.dataPoints.filter(function(dP){ return dP.value > 0; });
    positiveDataPoints.reverse().forEach(function(dataPoint){
      var innerBar = positiveBarsSection.addNewChild('VBarChartStackedDataBar', options);
      var barProportion = dataPoint.value / sumPositive;
      innerBar.setHeight(decimalToPercentageText(barProportion));
      chart.styleBarData(innerBar, dataPoint, options);
    });

    // Create a negative section scaled to its total
    var negativePortion =  -1 * sumNegative / barAbsSum;
    var negativeBarsSection = outerBar.addNewChild('VBarChartStackedNegativeBarSection', options);
    negativeBarsSection.setHeight(decimalToPercentageText(negativePortion));

    // Populate the negative section with interior scaling on its data
    var negativeDataPoints = dataSeries.dataPoints.filter(function(dP){ return dP.value < 0; });
    negativeDataPoints.forEach(function(dataPoint){
      var innerBar = negativeBarsSection.addNewChild('VBarChartStackedDataBar', options);
      var barProportion = dataPoint.value / sumNegative;
      innerBar.setHeight(decimalToPercentageText(barProportion));
      chart.styleBarData(innerBar, dataPoint, options);
    });

  });
};


/** Default method to set the position of a data bar */
_c_.verticalBarChart.stackedChart.setOuterBarPosition = function(bar, dataSeries, options){
  var chart = this;
  var constrainBetween = _c_.utils.numbers.constrainBetween;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  var sumIf = _c_.utils.arrays.sumIf;

  var seriesStats = {};
  seriesStats.values = dataSeries.dataPoints.map(function(x){ return x.value; });
  seriesStats.sumNegatives = sumIf(seriesStats.values, function(x){ return x < 0; });
  seriesStats.sumPositives = sumIf(seriesStats.values, function(x){ return x > 0; });
  // debugger;

  var yNegatives = chart.yAxis.getLocationAsDecimal(seriesStats.sumNegatives);
  var yPositives = chart.yAxis.getLocationAsDecimal(seriesStats.sumPositives);

  var yBottom = constrainBetween(yNegatives, 0, 1);
  var yTop = constrainBetween(yPositives, 0, 1);

  var yBarHeight = yTop - yBottom;

  bar.setHeight(decimalToPercentageText(yBarHeight));
  bar.setBottom(decimalToPercentageText(yBottom));
};


/** Default method to calculate and set the yAxis default values */
_c_.verticalBarChart.stackedChart.setYDefaults = function(dataCluster){
  var getMax = this.getMaxStackHeight;
  var getMin = this.getMinStackHeight;
  this.yAxis.yDefaults = {
    yMax: Math.max(getMax(dataCluster), 0),
    yMin: Math.min(getMin(dataCluster), 0),
    yLabelCount: 6
  };
};


/** Default method to calculate the minimum stack height of a cluster */
_c_.verticalBarChart.stackedChart.getMinStackHeight = function(dataCluster){
  var sumIf = _c_.utils.arrays.sumIf;
  var isNegative = function(x){ return (x < 0); };

  var currentMin = Infinity;
  dataCluster.dataSerieses.forEach(function(dataSeries){
    var values = dataSeries.dataPoints.map(function(dP){ return dP.value; });
    var seriesNegativeSum = sumIf(values, isNegative);
    currentMin = Math.min(seriesNegativeSum, currentMin);
  });
  return currentMin;
};


/** Default method to calculate the maximum stack height of a cluster */
_c_.verticalBarChart.stackedChart.getMaxStackHeight = function(dataCluster){
  var sumIf = _c_.utils.arrays.sumIf;
  var isPositive = function(x){ return (x > 0); };

  var currentMax = -Infinity;
  dataCluster.dataSerieses.forEach(function(dataSeries){
    var values = dataSeries.dataPoints.map(function(dP){ return dP.value; });
    var seriesPositiveSum = sumIf(values, isPositive);
    currentMax = Math.max(seriesPositiveSum, currentMax);
  });
  return currentMax;
};


/** Default method to calculate and set the yAxis from a data series */
_c_.verticalBarChart.stackedChart.populateYAxis = function(dataSeries, options){
  this.setYDefaults(dataSeries);
  this.yAxis.setYAxisNumbers(options);
  this.yAxis.yZero = this.yAxis.getLocationAsDecimal(0);
};


/** Default method to set the xAxis from a data cluster */
_c_.verticalBarChart.stackedChart.populateXAxis = function(dataCluster, options){
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  this.xAxis.barWidth = 1 / dataCluster.length();

  var chart = this;
  dataCluster.dataSerieses.forEach(function(dataSeries){
    var labelText = dataSeries.name || dataSeries.sum().toLocaleString();
    var xLabel = chart.xAxis.addLabel(labelText, options);
    xLabel.setWidth(decimalToPercentageText(chart.xAxis.barWidth));
  });
};
