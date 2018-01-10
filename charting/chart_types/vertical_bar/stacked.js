"use strict";

_c_.verticalBarChart.stackedChart = {};

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

_c_.verticalBarChart.stackedChart.populate = function(dataCluster, options){
  this.clearData();
  var barWidth = 1 / dataCluster.length();

  this.yAxis.setYAxisNumbers(dataCluster, options);
  var yZero = this.yAxis.getLocationAsDecimal(0);

  var me = this;
  var decimalToPercentageText = _c_.utils.numbers.decimalToPercentageText;
  var constrainBetween = _c_.utils.numbers.constrainBetween;

  dataCluster.dataSerieses.forEach(function(dataSeries){
    var bar = me.barArea.addNewChild('BarChartStackedBar', options);

    var negativeDataPoints = dataSeries.dataPoints.filter(function(dP){ return dP.value < 0; });
    var positiveDataPoints = dataSeries.dataPoints.filter(function(dP){ return dP.value > 0; });

    var values = dataSeries.dataPoints.map(function(x){ return x.value; });
    var sumIf = _c_.utils.arrays.sumIf;
    var sumNegative = sumIf(values, function(x){ return x < 0; });
    var sumPositive = sumIf(values, function(x){ return x > 0; });

    var yZero = me.yAxis.getLocationAsDecimal(0);
    var yNegatives = me.yAxis.getLocationAsDecimal(sumNegative);
    var yPositives = me.yAxis.getLocationAsDecimal(sumPositive);

    var yBarStart = constrainBetween(yNegatives, 0, 1);
    var yBarEnd = constrainBetween(yPositives, 0, 1);

    var yBarHeight = yBarEnd - yBarStart;

    bar.setHeight(decimalToPercentageText(yBarHeight));
    bar.setBottom(decimalToPercentageText(yBarStart));
    bar.setWidth(decimalToPercentageText(barWidth));

    var positiveBars = bar.addNewChild('BarChartStackedPositiveBarSection', options);
    var negativeBars = bar.addNewChild('BarChartStackedNegativeBarSection', options);
    var barAbsSum = sumPositive - sumNegative;
    var positivePortion = sumPositive / barAbsSum;
    var negativePortion = 1 - positivePortion;
    positiveBars.setHeight(decimalToPercentageText(positivePortion));
    negativeBars.setHeight(decimalToPercentageText(negativePortion));

    positiveDataPoints.reverse().forEach(function(dP){
      var innerBar = positiveBars.addNewChild('BarChartStackedDataBar', options);
      var barText = dP.value.toString() + (options.units || '');
      var barValueLabel = innerBar.addNewChild('BarChartBarValueLabel', options);
      var barProportion = dP.value / sumPositive;
      innerBar.setHeight(decimalToPercentageText(barProportion));
      innerBar.setBackgroundColor(dP['background-color']);
      innerBar.setBackground(dP['background']);
      barValueLabel.setText(dP.value);
    });

    negativeDataPoints.forEach(function(dP){
      var innerBar = negativeBars.addNewChild('BarChartStackedDataBar', options);
      var barText = dP.value.toString() + (options.units || '');
      var barValueLabel = innerBar.addNewChild('BarChartBarValueLabel', options);
      var barProportion = dP.value / sumNegative;
      innerBar.setHeight(decimalToPercentageText(barProportion));
      innerBar.setBackgroundColor(dP['background-color']);
      innerBar.setBackground(dP['background']);
      barValueLabel.setText(dP.value);
    });

    var labelText = dataSeries.name || (sumNegative + sumPositive).toLocaleString();
    var xLabel = me.xAxis.addLabel(labelText, options);
    xLabel.setWidth(decimalToPercentageText(barWidth));
  });
};


_c_.verticalBarChart.stackedChart.create = function(options){
  var chart = _c_.verticalBarChart.baseChart.create(options);

  if (options.height) { chart.container.setHeight(options.height); }
  if (options.id) { chart.container.setId(options.id); }
  if (options.title) { chart.title.setText(options.title); }
  if (options.width) { chart.container.setWidth(options.width); }

  if (!chart.yAxis.setYAxisNumbers){
    chart.yAxis.setYAxisNumbers = function(dataCluster, options){
      var paddingFactor = 1.1;
      var getMax = _c_.verticalBarChart.stackedChart.getMaxStackHeight;
      var getMin = _c_.verticalBarChart.stackedChart.getMinStackHeight;
      var yOptions = options.yAxis || {
        yMax: Math.max(getMax(dataCluster), 0) * paddingFactor,
        yMin: Math.min(getMin(dataCluster), 0) * paddingFactor,
        yLabelCount: 6
      };
      _c_.verticalBarChart.baseChart.setYAxisNumbers.call(this, yOptions, options);
    };
  }

  if (!chart.setDataCluster){
    chart.setDataCluster = this.populate.bind(chart);
  }

  return chart;
};


_c_.draw.stackedVerticalBarChart = function(dataCluster, options, element){
  var chart = _c_.verticalBarChart.stackedChart.create(options);
  chart.setDataCluster(dataCluster, options);

  var htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};
