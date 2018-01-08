/** This is a variation on the idea of building an array from min-max-step.
 *  It expands the outer bounds as needed to ensure that both given bounds
 *  are contained within the returned array. This prevents graph data from
 *  overflowing the numbers returned for a numerical axis.
*/
var linearAxisArray = function(maxLBound, minUBound, step){
  var arr = [];
  var min = maxLBound;
  var max = minUBound;
  if ((max - min) % step !== 0){
    min = Math.floor(min / step) * step;
    max = Math.ceil(max / step) * step;
  }
  for (var x = min; x <= max; x += step){
    arr.push(x);
  }
  return arr;
};


var linearArrayFromMinMaxLen = function(min, max, len){
  var arr = [];
  var step = (max - min) / (len - 1);
  for (var i = 0; i < len; i++){
    arr.push(min + (i * step));
  }
  return arr;
};


var linearArrayFromMinStepLen = function(min, step, len){
  var arr = [];
  for (var i = 0; i < len; i++){
    arr.push(min + (i * step));
  }
  return arr;
};


var linearArrayFromMaxStepLen = function(max, step, len){
  var arr = [];
  for (var i = 0; i < len; i++){
    arr.push(max - (i * step));
  }
  return arr;
};


var setYAxisNumbers = function(dataSeries, options){
  var yOptions = options.yAxis || {
    yMax: Math.max(dataSeries.maxValue(), 0),
    yMin: Math.min(dataSeries.minValue(), 0),
    yLabelCount: 6
  };

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

  if (this.yMin > dataSeries.minValue() || this.yMax < dataSeries.maxValue()){
    throw 'Chart Error: Data out of provided graph bounds';
  }

  var addLabel = this.addLabel.bind(this);
  this.yNumbers.forEach(function(yNumber){
    var labelText = yNumber.toLocaleString() + (options.units || '');
    addLabel(labelText, options);
  });
};


var constrain = function(x, min, max){
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


var decimalToPercentageText = function(decimal, decimalPlaces){
  var percentage = decimal * 100;
  if (!isNaN(decimalPlaces)){
    percentage = percentage.toFixed(decimalPlaces);
  }
  return percentage + '%';
};


var chartSetDataSeries = function(dataSeries, options){
  this.clearData();
  var barWidth = 1 / dataSeries.length();
  this.yAxis.setYAxisNumbers(dataSeries, options);
  var yZero = this.yAxis.getLocationAsDecimal(0);

  var me = this;
  dataSeries.dataPoints.forEach(function(dataPoint){
    var bar = me.barArea.addNewChild('BarChartSingleBar', options);
    var barValueLabel = bar.addNewChild('BarChartBarValueLabel', options);

    var yData = me.yAxis.getLocationAsDecimal(dataPoint.value);

    var yBarStart = constrain(yZero, 0, 1);
    var yBarEnd = constrain(yData, 0, 1);

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

var createVerticalBarChart = function(options){
  var chart = createBaseBarChart(options);

  if (options.height) { chart.container.setHeight(options.height); }
  if (options.id) { chart.container.setId(options.id); }
  if (options.title) { chart.title.setText(options.title); }
  if (options.width) { chart.container.setWidth(options.width); }

  if (!chart.yAxis.setYAxisNumbers){
    chart.yAxis.setYAxisNumbers = setYAxisNumbers.bind(chart.yAxis);
  }

  if (!chart.yAxis.getLocationAsDecimal){
    chart.yAxis.getLocationAsDecimal = function(value){
      return (value - this.yMin) / (this.yMax - this.yMin);
    };
  }

  if (!chart.setDataSeries){
    chart.setDataSeries = chartSetDataSeries.bind(chart);
  }

  return chart;
};
