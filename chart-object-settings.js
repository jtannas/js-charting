
var CHART_SETTINGS = {
  // Each property of this object is to extend an object definition for an object factory.
  // The object definitions are in the CHART_DEFINITIONS.
  // These are intended to extend the HtmlSpec defined in html-builder.js
  // They can be extended or overridden via provided options.
  // These settings are independent of each other - think of them as building blocks.

  BarChart: {
    '_attributes': {
      'class': 'bar_chart',
      'css': {
        'background-color': 'white',
        'border': '1px solid black'
      }
    }
  },

  BarChartBarArea: {
    '_attributes': {
      'class': 'bar-area'
    }
  },

  BarChartBarValueLabel: {
    '_attributes': {
      'class': 'value-label',
      'css': {
        'text-align': 'center'
      }
    }
  },

  BarChartGraphContent: {
    '_attributes': {
      'class': 'graph-contents'
    }
  },

  BarChartSingleBar: {
    '_attributes': {
      'class': 'single-bar',
      'css': {
        'border': '1px solid black'
      }
    }
  },

  BarChartStackedBar: {
    '_attributes': {
      'class': 'stacked-bar',
    }
  },

  BarChartTitle: {
    '_attributes': {
      'class': 'title',
      'css': {
        'display': 'flex',
        'justify-content': 'center'
      }
    }
  },

  BarChartXAxis: {
    '_attributes': {
      'class': 'x-axis',
      'css': {
        'border-top': '1px solid black',
        'text-align': 'center'
      }
    }
  },

  BarChartXAxisLabel: {
    '_attributes': {
      'class': 'x-axis-label'
    }
  },

  BarChartYAxis: {
    '_attributes': {
      'class': 'y-axis',
      'css': {
        'border-right': '1px solid black'
      }
    }
  },

  BarChartYAxisLabel: {
    '_attributes': {
      'class': 'y-axis-label',
      'css': {
        'text-align': 'right'
      }
    }
  },
};
