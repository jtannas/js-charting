/** Each property of this object is meant as an object definition for an object factory.
 * These are intended to extend the HtmlSpec defined in html-builder.js
 * They can be extended or overridden via CHART_SETTINGS or provided options.
 * These definitions are independent of each other - think of them as building blocks.
 * The definitions provide the bare minimum to make the chart _behave_ as intended.
 * @readonly
 */
var CHART_DEFINITIONS = {};

var common = {
  setBackground: function(background){
    this._attributes.css['background'] = background;
  },
  setBackgroundColor: function(backgroundColor){
    this._attributes.css['background-color'] = backgroundColor;
  },
  setBottom: function(bottom){
    this._attributes.css.bottom = bottom;
  },
  setHeight: function(height){
    this._attributes.css.height = height;
  },
  setId: function(id){
    this._attributes.id = id;
  },
  setTitle: function(title){
    this._attributes.title = title;
  },
  setText: function(text){
    this._attributes.innerHTML = text;
  },
  setWidth: function(width){
    this._attributes.css.width = width;
  },
  _type: 'div'
};

CHART_DEFINITIONS.BarChartContainer = $.extend(true, {}, common, {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column'
    }
  }
});

CHART_DEFINITIONS.BarChartBarArea = $.extend(true, {}, common, {
  '_attributes': {
    'class': 'bar-area',
    'css': {
      'align-items': 'flex-end',
      'display': 'flex',
      'justify-content': 'space-around'
    }
  }
});

CHART_DEFINITIONS.BarChartBarValueLabel = $.extend(true, {}, common, {
  '_attributes': {
    'css': {
      'text-align': 'center'
    }
  }
});

CHART_DEFINITIONS.BarChartGraphContent = $.extend(true, {}, common, {
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
});

CHART_DEFINITIONS.BarChartSingleBar = $.extend(true, {}, common, {
  '_attributes': {
    'class': 'single-bar',
    'css': {
      'position': 'relative',
      'flex-basis': '0',
      'flex-grow': '1'
    }
  }
});

CHART_DEFINITIONS.BarChartStackedBar = $.extend(true, {}, common, {
  '_attributes': {
    'class': 'stacked-bar',
    'css': {
      'display': 'flexbox',
      'flex-basis': '0',
      'flex-direction': 'column',
      'flex-grow': '1'
    }
  }
});

CHART_DEFINITIONS.BarChartTitle = $.extend(true, {}, common, {
});

CHART_DEFINITIONS.BarChartXAxis = $.extend(true, {}, common, {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'row',
      'height': '100%',
      'justify-content': 'space-around'
    }
  }
});

CHART_DEFINITIONS.BarChartXAxisLabel = $.extend(true, {}, common, {
  '_attributes': {
    'class': 'x-axis-label',
    'css': {
      'flex': '1'
    }
  }
});

CHART_DEFINITIONS.BarChartYAxis = $.extend(true, {}, common, {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column',
      'height': '100%',
      'justify-content': 'space-between'
    }
  }
});

CHART_DEFINITIONS.BarChartYAxisLabel = $.extend(true, {}, common, {
});
