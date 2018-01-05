var CHART_DEFAULTS = {
  // Each property of this object is meant as an object definition for an object factory
  // These are intended to extend the HtmlSpec defined in html-builder.js
  // They provide the bare minimum to make the chart behave as intended.
  // They can be extended or overridden via CHART_SETTINGS or provided options

  BarChart: {
    '_type': 'div',
    '_attributes': {
      'css': {
        'display': 'flex',
        'flex-direction': 'column'
      }
    },
    setHeight: function(height){
      this._attributes.css.height = height;
    }
  },

  BarChartBarArea: {
    '_type': 'div',
    '_attributes': {
      'class': 'bar-area',
      'css': {
        'align-items': 'flex-end',
        'display': 'flex',
        'justify-content': 'space-around'
      }
    }
  },

  BarChartBarValueLabel: {
    '_type': 'div',
    '_attributes': {
      'css': {
        'text-align': 'center'
      }
    },
    setText: function(text){
      this._attributes.innerHTML = text;
    }
  },

  BarChartGraphContent: {
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
    xAxisCss: {
      'grid-column': '2',
      'grid-row': '2'
    },
    yAxisCss: {
      'grid-column': '1',
      'grid-row': '1'
    },
    barAreaCss: {
      'grid-column': '2',
      'grid-row': '1'
    }
  },

  BarChartSingleBar: {
    '_type': 'div',
    '_attributes': {
      'class': 'single-bar',
      'css': {
        'flex-basis': '0',
        'flex-grow': '1'
      }
    },
    setPercentHeight: function(percentHeight){
      this._attributes.css.height = percentHeight.toString() + '%';
    },
    setColor: function(color){
      this._attributes.css['background-color'] = color;
    }
  },

  BarChartStackedBar: {
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
  },

  BarChartTitle: {
    '_type': 'div',
    setText: function(text){
      this._attributes.innerHTML = text;
      return text;
    }
  },

  BarChartXAxis: {
    '_type': 'div',
    '_attributes': {
      'css': {
        'display': 'flex',
        'flex-direction': 'row',
        'height': '100%',
        'justify-content': 'space-around',
      }
    }
  },

  BarChartXAxisLabel: {
    '_type': 'div',
    '_attributes': {
      'class': 'x-axis-label',
      'css': {
        'flex': '1'
      }
    },
    setText: function(text){
      this._attributes.innerHTML = text;
    }
  },

  BarChartYAxis: {
    '_type': 'div',
    '_attributes': {
      'css': {
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'justify-content': 'space-between',
      }
    }
  },

  BarChartYAxisLabel: {
    '_type': 'div',
    setText: function(text){
      this._attributes.innerHTML = text;
    }
  }

};
