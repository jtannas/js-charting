"use strict";

var sumIf = function(arr, testFunc){
  var sum = 0;
  arr.forEach(function(element){
    sum += testFunc(element) === true ? element : 0;
  });
  return sum;
};

var getMinStackHeight = function(dataCluster){
  var isNegative = function(x){ return (x < 0); };
  var currentMin = Infinity;
  dataCluster.dataSerieses.forEach(function(dataSeries){
    var values = dataSeries.dataPoints.map(function(dP){ return dP.value; });
    var seriesNegativeSum = sumIf(values, isNegative);
    currentMin = Math.min(seriesNegativeSum, currentMin);
  });
  return currentMin;
};

var getMaxStackHeight = function(dataCluster){
  var isPositive = function(x){ return (x > 0); };
  var currentMax = -Infinity;
  dataCluster.dataSerieses.forEach(function(dataSeries){
    var values = dataSeries.dataPoints.map(function(dP){ return dP.value; });
    var seriesPositiveSum = sumIf(values, isPositive);
    currentMax = Math.max(seriesPositiveSum, currentMax);
  });
  return currentMax;
};

var populateStackedVerticalBarChart = function(dataCluster, options){
  this.clearData();
  var barWidth = 1 / dataCluster.length();

  this.yAxis.setYAxisNumbers(dataCluster, options);
  var yZero = this.yAxis.getLocationAsDecimal(0);

  var me = this;
  dataCluster.dataSerieses.forEach(function(dataSeries){
    var bar = me.barArea.addNewChild('BarChartStackedBar', options);

    var negativeDataPoints = dataSeries.dataPoints.filter(function(dP){ return dP.value < 0; });
    var positiveDataPoints = dataSeries.dataPoints.filter(function(dP){ return dP.value > 0; });

    var values = dataSeries.dataPoints.map(function(x){ return x.value; });
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


var createStackedVerticalBarChart = function(options){
  var chart = createBaseBarChart(options);

  if (options.height) { chart.container.setHeight(options.height); }
  if (options.id) { chart.container.setId(options.id); }
  if (options.title) { chart.title.setText(options.title); }
  if (options.width) { chart.container.setWidth(options.width); }


  if (!chart.yAxis.getLocationAsDecimal){
    chart.yAxis.getLocationAsDecimal = function(value){
      return (value - this.yMin) / (this.yMax - this.yMin);
    };
  }

  if (!chart.yAxis.setYAxisNumbers){
    chart.yAxis.setYAxisNumbers = function(dataCluster, options){
      var paddingFactor = 1.1;
      var yOptions = options.yAxis || {
        yMax: Math.max(getMaxStackHeight(dataCluster), 0) * paddingFactor,
        yMin: Math.min(getMinStackHeight(dataCluster), 0) * paddingFactor,
        yLabelCount: 6
      };
      setYAxisNumbers.call(this, yOptions, options);
    };
  }

  if (!chart.setDataCluster){
    chart.setDataCluster = populateStackedVerticalBarChart.bind(chart);
  }

  return chart;
};
