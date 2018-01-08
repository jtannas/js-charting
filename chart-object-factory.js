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
  this.pushChild(newObject);
  return newObject;
};


var createBaseBarChart = function(options){

  var chart = {};
  chart.container = ChartObject.create('BarChartContainer', options);
  if (!chart.build){
    chart.build = function(){
      return this.container.createElement();
    };
  }

  chart.title = chart.container.addNewChild('BarChartTitle', options);
  chart.graphContents = chart.container.addNewChild('BarChartGraphContent', options);

  chart.xAxis = chart.graphContents.addNewChild('BarChartXAxis', options);
  if (!chart.xAxis.addLabel){
    chart.xAxis.addLabel = function(text, options) {
      var xLabel = this.addNewChild('BarChartXAxisLabel', options);
      xLabel.setText(text);
      return xLabel;
    };
  }

  chart.yAxis = chart.graphContents.addNewChild('BarChartYAxis', options);
  if (!chart.yAxis.addLabel){
    chart.yAxis.addLabel = function(text, options){
      var yLabel = this.addNewChild('BarChartYAxisLabel', options);
      yLabel.setText(text);
      return yLabel;
    };
  }

  chart.barArea = chart.graphContents.addNewChild('BarChartBarArea', options);
  if (!chart.addBar){
    chart.addBar = function(){
      throw "The Base Bar Chart does not implement the addition of bars.";
    };
  }

  if (!chart.clearData){
    chart.clearData = function(){
      this.barArea.clearChildren();
      this.xAxis.clearChildren();
    };
  }

  return chart;
};
