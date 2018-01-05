// requires jquery and create-dom-object-from-json.js
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


var drawBarChart = function(data, options, element){
  // Conform the data to specs
  var dataSeries = makeDataSeries(data);

  // Create and configure the chart container
  var chart = createChartObject('BarChart', options);
  if (options.height) {
    chart.setHeight(options.height);
  }

  // Add the title if it is specified
  if (options.title) {
    var title = createChartObject('BarChartTitle', options);
    title.setText(options.title);
    chart.addChild(title);
  }

  // Create a container for the graph contents
  var graphContents = createChartObject('BarChartGraphContent', options);

  // Create & Configure the xAxis and add it to the graphContents
  var xAxis = createChartObject('BarChartXAxis', options);
  xAxis.extendCss(graphContents.xAxisCss);
  dataSeries.forEach(function(dataPoint){
    var xLabel = createChartObject('BarChartXAxisLabel', options);
    xLabel.setText(dataPoint.name);
    xAxis.addChild(xLabel);
  });
  graphContents.addChild(xAxis);

  // Create & Configure the bars and add them to the graphContents
  var barArea = createChartObject('BarChartBarArea', options);
  barArea.extendCss(graphContents.barAreaCss);

  var maxValue = getMaxDataValue(dataSeries);
  dataSeries.forEach(function(dataPoint){
    var bar = createChartObject('BarChartSingleBar', options);
    bar.setPercentHeight(dataPoint.value / maxValue * 100);
    bar.setColor(dataPoint.color);
    var barValueLabel = createChartObject('BarChartBarValueLabel', options);
    barValueLabel.setText(dataPoint.value.toString());
    bar.addChild(barValueLabel);
    barArea.addChild(bar);
  });
  graphContents.addChild(barArea);

  // Create & Configure the yAxis and add it to the graphContents
  var yAxis = createChartObject('BarChartYAxis', options);
  yAxis.extendCss(graphContents.yAxisCss);
  var yMax = options.yMax || getMaxDataValue(dataSeries);
  var yDivisions = options.yDivisions || 5;
  var yMin = 0;
  var yStep = (yMax - yMin) / yDivisions
  for (var labelVal = yMax; labelVal >= yMin; labelVal -= yStep){
    var yAxisLabel = createChartObject('BarChartYAxisLabel', options);
    yAxisLabel.setText(labelVal.toString());
    yAxis.addChild(yAxisLabel);
  }
  graphContents.addChild(yAxis);

  // Put the graph contents into the chart
  chart.addChild(graphContents);

  // Create the element, append it as directed, and return it to the caller
  htmlGraph = chart.createElement();
  if (element) {
    element.append(htmlGraph);
  }
  return htmlGraph;
};
