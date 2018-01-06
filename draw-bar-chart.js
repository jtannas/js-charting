function DataPoint(value, name, color){
  this.value = (value || null);
  this.name = (name || '');
  this.color = (color || 'white');
}


var makeDataSeries = function(dataArray){
  var data = [];
  for (var i = 0; i < dataArray.length; i++){
    if (dataArray[i].constructor === Array) {
      data.push(makeDataSeries(dataArray[i]));
    } else {
      var dp = new DataPoint(
        dataArray[i].value || dataArray[i],
        dataArray[i].name || i.toString(),
        dataArray[i].color
      );
      data.push(dp);
    }
  }
  return data;
};


var getMaxDataValue = function(dataSeries){
  var maxValue = -Infinity;
  for (var i = 0; i < dataSeries.length; i++){
    if (dataSeries[i].constructor === Array) {
      maxValue = Math.max(maxValue, getMax(dataSeries[i]));
    } else {
      maxValue = Math.max(maxValue, dataSeries[i].value);
    }
  }
  return maxValue;
};


var getMinDataValue = function(dataSeries){
  var minValue = Infinity;
  for (var i = 0; i < dataSeries.length; i++){
    if (dataSeries[i].constructor === Array) {
      minValue = Math.min(minValue, getMax(dataSeries[i]));
    } else {
      minValue = Math.min(minValue, dataSeries[i].value);
    }
  }
  return minValue;
};


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

  var dataSeries = makeDataSeries(data);

  var yAxisOptions = options.yAxis || {
    yMax: Math.max(getMaxDataValue(dataSeries), 0),
    yMin: Math.min(getMinDataValue(dataSeries), 0),
    yDivisions: 5
  };
  var yAxisNumbers = getYAxisNumbers(yAxisOptions);
  var yMax = yAxisNumbers[0];
  var yMin = yAxisNumbers[yAxisNumbers.length - 1];

  if (yMin > getMinDataValue(dataSeries) || yMax < getMaxDataValue(dataSeries)){
    throw 'Chart Error: Data out of provided graph bounds';
  }

  yAxisNumbers.forEach(function(labelVal){
    chart.yAxis.addLabel(labelVal.toLocaleString() + (options.units || ''));
  });
  yZeroPercentHeight = ( 0 - yMin ) / ( yMax - yMin ) * 100;

  dataSeries.forEach(function(dataPoint){
    var percentWidth = 100 / dataSeries.length;
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

    var xLabel = chart.xAxis.addLabel(dataPoint.name || dataPoint.value.toString());
    xLabel.setPercentWidth(percentWidth);

    var barText = dataPoint.value.toString() + (options.units || '');
    var bar = chart.barArea.addBar(barText);
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
