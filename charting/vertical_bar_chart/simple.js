"use strict";

var populateSimpleVerticalBarChart = function(dataSeries, options){
  this.clearData();
  var barWidth = 1 / dataSeries.length();
  this.yAxis.setYAxisNumbers(dataSeries, options);
  var yZero = this.yAxis.getLocationAsDecimal(0);

  var me = this;
  dataSeries.dataPoints.forEach(function(dataPoint){
    var bar = me.barArea.addNewChild('BarChartSingleBar', options);
    var barValueLabel = bar.addNewChild('BarChartBarValueLabel', options);

    var yData = me.yAxis.getLocationAsDecimal(dataPoint.value);

    var yBarStart = constrainBetween(yZero, 0, 1);
    var yBarEnd = constrainBetween(yData, 0, 1);

    var yBarBottom = Math.min(yBarStart, yBarEnd);
    var yBarTop = Math.max(yBarStart, yBarEnd);
    var yBarHeight = yBarTop - yBarBottom;

    var barText = dataPoint.value.toString() + (options.units || '');
    bar.setBackgroundColor(dataPoint['background-color']);
    bar.setBackground(dataPoint['background']);
    bar.setHeight(decimalToPercentageText(yBarHeight));
    bar.setBottom(decimalToPercentageText(yBarBottom));
    bar.setWidth(decimalToPercentageText(barWidth));
    barValueLabel.setText(dataPoint.value);

    var labelText = dataPoint.name || dataPoint.value.toLocaleString();
    var xLabel = me.xAxis.addLabel(labelText, options);
    xLabel.setWidth(decimalToPercentageText(barWidth));
  });
};

var createSimpleVerticalBarChart = function(options){
  var chart = createBaseBarChart(options);

  if (options.height) { chart.container.setHeight(options.height); }
  if (options.id) { chart.container.setId(options.id); }
  if (options.title) { chart.title.setText(options.title); }
  if (options.width) { chart.container.setWidth(options.width); }

  if (!chart.yAxis.setYAxisNumbers){
    chart.yAxis.setYAxisNumbers = function(dataSeries, options){
      var yOptions = options.yAxis || {
        yMax: Math.max(dataSeries.maxValue(), 0),
        yMin: Math.min(dataSeries.minValue(), 0),
        yLabelCount: 6
      };
      setYAxisNumbers.call(this, yOptions, options);
    };
  }

  if (!chart.yAxis.getLocationAsDecimal){
    chart.yAxis.getLocationAsDecimal = function(value){
      return (value - this.yMin) / (this.yMax - this.yMin);
    };
  }

  if (!chart.setDataSeries){
    chart.setDataSeries = populateSimpleVerticalBarChart.bind(chart);
  }

  return chart;
};