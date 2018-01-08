var range = function(start, stop, step){
  // Inspired by the range function in Python
  var result = [];
  for (var num = start; num <= stop; num += step){
    result.push(num);
  }
  return result;
};


var getYAxisNumbers = function(options){
  var isMinGiven = (options.yMin !== undefined);
  var isMaxGiven = (options.yMax !== undefined);
  var isStepGiven = (options.yStep !== undefined);
  var isDivisionsGiven = (options.yDivisions !== undefined);

  var yMin = options.yMin;
  var yMax = options.yMax;
  var yStep = options.yStep;
  var yDivisions = options.yDivisions;

  if (isMinGiven && isMaxGiven && isStepGiven && isDivisionsGiven){
    throw 'Y-Axis is over-defined';
  } else if (isMinGiven && isMaxGiven && isStepGiven){
    yMax += (yMax - yMin) % yStep;
  } else if (isMinGiven && isMaxGiven && isDivisionsGiven){
    yStep = (yMax - yMin) / yDivisions;
  } else if (isMinGiven && isStepGiven && isDivisionsGiven){
    yMax = yMin + (yStep * yDivision);
  } else if (isMaxGiven && isStepGiven && isDivisionsGiven){
    yMin = yMax - (yStep * yDivision);
  } else {
    throw 'Y-Axis is under-defined';
  }
  return range(yMin, yMax, yStep).reverse();
};


var drawBarChart = function(data, options, element){

  var chart = createBaseChart(options);
  if (options.height) { chart.container.setHeight(options.height); }
  if (options.id) { chart.container.setId(options.id); }
  if (options.title) { chart.title.setText(options.title); }
  if (options.width) { chart.container.setWidth(options.width); }

  var dataSeries = DataSeries.makeFromBestGuess(data);

  var yAxisOptions = options.yAxis || {
    yMax: Math.max(dataSeries.maxValue(), 0),
    yMin: Math.min(dataSeries.minValue(), 0),
    yDivisions: 5
  };

  var yAxisNumbers = getYAxisNumbers(yAxisOptions);
  var yMax = yAxisNumbers[0];
  var yMin = yAxisNumbers[yAxisNumbers.length - 1];

  if (yMin > dataSeries.minValue() || yMax < dataSeries.maxValue()){
    throw 'Chart Error: Data out of provided graph bounds';
  }

  yAxisNumbers.forEach(function(labelVal){
    chart.yAxis.addLabel(labelVal.toLocaleString() + (options.units || ''), options);
  });
  yZeroPercentHeight = ( 0 - yMin ) / ( yMax - yMin ) * 100;

  dataSeries.dataPoints.forEach(function(dataPoint){
    var percentWidth = 100 / dataSeries.length();
    var barPercentHeight = 0;
    var barBottom = 0;

    if (yMin < 0 && yMax > 0) {
      barPercentHeight = Math.abs(dataPoint.value / (yMax - yMin) * 100);
      if (dataPoint.value >= 0){
        barBottom = yZeroPercentHeight;
      } else {
        barBottom = yZeroPercentHeight - barPercentHeight;
      }
    } else if (yMax <= 0) {
      barPercentHeight = Math.abs(dataPoint.value - yMax) / (yMax - yMin) * 100;
      barBottom = 100 - barPercentHeight;
    } else {
      barPercentHeight = (dataPoint.value - yMin) / (yMax - yMin) * 100;
      barBottom = 0;
    }

    var xLabel = chart.xAxis.addLabel(dataPoint.name || dataPoint.value.toString(), options);
    xLabel.setPercentWidth(percentWidth);

    var barText = dataPoint.value.toString() + (options.units || '');
    var bar = chart.barArea.addBar(barText, options);
    bar.setColor(dataPoint.color);
    bar.setPercentHeight(barPercentHeight);
    bar.setPercentBottom(barBottom);
    bar.setPercentWidth(100 / dataSeries.length);
  });

  htmlGraph = chart.build();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};
