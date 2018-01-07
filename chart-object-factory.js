var ChartObject = Object.create(HtmlSpec);

/** Creates a chart object with a given name, modifying it with the provides options.
 * @param {string} typeName - The name of the chart object in the CHART_DEFINITIONS
    & CHART_SETTINGS & options
 * @param {object} options - options[typeName] is 'folded into' the definition
    of the returned object.
 */
ChartObject.create = function(typeName, options){
  var definitions = ('CHART_DEFINITIONS' in window) ? CHART_DEFINITIONS[typeName] || {} : {};
  var settings = ('CHART_SETTINGS' in window) ? CHART_SETTINGS[typeName] || {} : {};
  var objOptions = options[typeName] || {};
  return this.createUsingExtendedOptions(typeName, [definitions, settings, objOptions]);
};


ChartObject.prototype.addNewChild = function(typeName, options){
  var newObject = ChartObject.create(typeName, options);
  if (this[typeName + 'Css']){
    newObject.extendCss(this[typeName + 'Css']);
  }
  this.addChild(newObject);
  return newObject;
};


var createBaseChart = function(options){

  var chart = {};
  chart.container = ChartObject.create('BarChartContainer', options);
  chart.build = function(){
    return this.container.createElement();
  };

  chart.title = chart.container.addNewChild('BarChartTitle', options);
  chart.graphContents = chart.container.addNewChild('BarChartGraphContent', options);

  chart.xAxis = chart.graphContents.addNewChild('BarChartXAxis', options);
  chart.xAxis.addLabel = function(text, options) {
    var xLabel = this.addNewChild('BarChartXAxisLabel', options);
    xLabel.setText(text);
    return xLabel;
  };

  chart.yAxis = chart.graphContents.addNewChild('BarChartYAxis', options);
  chart.yAxis.addLabel = function(text, options){
    var yLabel = this.addNewChild('BarChartYAxisLabel', options);
    yLabel.setText(text);
    return yLabel;
  };

  chart.barArea = chart.graphContents.addNewChild('BarChartBarArea', options);
  chart.barArea.addBar = function(valueLabel, options){
    var bar = this.addNewChild('BarChartSingleBar', options);
    var barValueLabel = bar.addNewChild('BarChartBarValueLabel', options);
    barValueLabel.setText(valueLabel);
    return bar;
  };

  return chart;
};
