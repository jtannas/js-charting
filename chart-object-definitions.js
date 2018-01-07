/** Each property of this object is meant as an object definition for an object factory.
 * These are intended to extend the HtmlSpec defined in html-builder.js
 * They can be extended or overridden via CHART_SETTINGS or provided options.
 * These definitions are independent of each other - think of them as building blocks.
 * The definitions provide the bare minimum to make the chart _behave_ as intended.
 * @readonly
 */
var CHART_DEFINITIONS = {};

CHART_DEFINITIONS.BarChartContainer = {
  '_type': 'div',
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column'
    }
  },
  setHeight: function(height){
    this._attributes.css.height = height;
  },
  setId: function(id){
    this._attributes.id = id;
  },
  setWidth: function(width){
    this._attributes.css.width = width;
  }
};

CHART_DEFINITIONS.BarChartBarArea = {
  '_type': 'div',
  '_attributes': {
    'class': 'bar-area',
    'css': {
      'align-items': 'flex-end',
      'display': 'flex',
      'justify-content': 'space-around'
    }
  }
};

CHART_DEFINITIONS.BarChartBarValueLabel = {
  '_type': 'div',
  '_attributes': {
    'css': {
      'text-align': 'center'
    }
  },
  setText: function(text){
    this._attributes.innerHTML = text;
  }
};

CHART_DEFINITIONS.BarChartGraphContent = {
  '_type': 'div',
  '_attributes': {
    'css': {
      'display': 'grid',
      'flex-basis': '0',
      'flex-grow': '1',
      'grid-template-columns': 'max-content auto',
      'grid-template-rows': 'auto max-content'
    }
  },
  BarChartXAxisCss: {
    'grid-column': '2',
    'grid-row': '2'
  },
  BarChartYAxisCss: {
    'grid-column': '1',
    'grid-row': '1'
  },
  BarChartBarAreaCss: {
    'grid-column': '2',
    'grid-row': '1'
  }
};

CHART_DEFINITIONS.BarChartSingleBar = {
  '_type': 'div',
  '_attributes': {
    'class': 'single-bar',
    'css': {
      'position': 'relative',
      'flex-basis': '0',
      'flex-grow': '1'
    }
  },
  setColor: function(color){
    this._attributes.css['background-color'] = color;
  },
  setPercentBottom: function(percentBottom){
    this._attributes.css.bottom = percentBottom.toString() + '%';
  },
  setPercentHeight: function(percentHeight){
    this._attributes.css.height = percentHeight.toString() + '%';
  },
  setPercentWidth: function(percentWidth){
    this._attributes.css.width = percentWidth.toString() + '%';
  }
};

CHART_DEFINITIONS.BarChartStackedBar = {
  'type': 'div',
  'attributes': {
    'class': 'stacked-bar',
    'css': {
      'display': 'flexbox',
      'flex-basis': '0',
      'flex-direction': 'column',
      'flex-grow': '1'
    }
  },
  setPercentHeight: function(percentHeight){
    this._attributes.css.height = percentHeight.toString() + '%';
  }
};

CHART_DEFINITIONS.BarChartTitle = {
  '_type': 'div',
  setText: function(text){
    this._attributes.innerHTML = text;
    return text;
  }
};

CHART_DEFINITIONS.BarChartXAxis = {
  '_type': 'div',
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'row',
      'height': '100%',
      'justify-content': 'space-around'
    }
  }
};

CHART_DEFINITIONS.BarChartXAxisLabel = {
  '_type': 'div',
  '_attributes': {
    'class': 'x-axis-label',
    'css': {
      'flex': '1'
    }
  },
  setText: function(text){
    this._attributes.innerHTML = text;
  },
  setPercentWidth: function(percentWidth){
    this._attributes.css.width = percentWidth.toString() + '%';
  }
};

CHART_DEFINITIONS.BarChartYAxis = {
  '_type': 'div',
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column',
      'height': '100%',
      'justify-content': 'space-between'
    }
  }
};

CHART_DEFINITIONS.BarChartYAxisLabel = {
  '_type': 'div',
  setText: function(text){
    this._attributes.innerHTML = text;
  }
};
