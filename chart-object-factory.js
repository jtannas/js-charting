/** Creates a chart object with a given name, modifying it with the provides options.
 * @param {string} typeName - The name of the chart object in the CHART_DEFINITIONS
    & CHART_SETTINGS & options
 * @param {object} options - options[typeName] is 'folded into' the definition
    of the returned object.
 */
function createChartObject(typeName, options){
  var definitions = ('CHART_DEFINITIONS' in window) ? CHART_DEFINITIONS[typeName] || {} : {};
  var settings = ('CHART_SETTINGS' in window) ? CHART_SETTINGS[typeName] || {} : {};
  var objOptions = options[typeName] || {};
  return HtmlSpec.createUsingExtendedOptions(typeName, [definitions, settings, objOptions]);
}


var createBaseChart = function(options){
  var container = createChartObject('BarChart', options);

  var title = createChartObject('BarChartTitle', options);
  container.addChild(title);

  var graphContents = createChartObject('BarChartGraphContent', options);
  container.addChild(graphContents);

  var xAxis = createChartObject('BarChartXAxis', options);
  xAxis.extendCss(graphContents.xAxisCss);
  xAxis.addLabel = function(text) {
    var xLabel = createChartObject('BarChartXAxisLabel', options);
    xLabel.setText(text);
    this.addChild(xLabel);
    return xLabel;
  };
  graphContents.addChild(xAxis);

  var yAxis = createChartObject('BarChartYAxis', options);
  yAxis.extendCss(graphContents.yAxisCss);
  yAxis.addLabel = function(text){
    var yAxisLabel = createChartObject('BarChartYAxisLabel', options);
    yAxisLabel.setText(text);
    this.addChild(yAxisLabel);
    return yAxisLabel;
  };
  graphContents.addChild(yAxis);

  var barArea = createChartObject('BarChartBarArea', options);
  barArea.extendCss(graphContents.barAreaCss);
  barArea.addBar = function(valueLabel){
    var bar = createChartObject('BarChartSingleBar', options);
    var barValueLabel = createChartObject('BarChartBarValueLabel', options);
    barValueLabel.setText(valueLabel);
    bar.addChild(barValueLabel);
    this.addChild(bar);
    return bar;
  }
  graphContents.addChild(barArea);

  return {
    container: container,
    title: title,
    graphContents: graphContents,
    xAxis: xAxis,
    yAxis: yAxis,
    barArea: barArea,
    build: function(){
      return this.container.createElement();
    }
  };
};
