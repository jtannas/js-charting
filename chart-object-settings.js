// Each property of this object is to extend an object definition for an object factory.
// The object definitions are in the CHART_DEFINITIONS.
// These are intended to extend the HtmlSpec defined in html-builder.js
// They can be extended or overridden via provided options.
// These settings are independent of each other - think of them as building blocks.
var CHART_SETTINGS = {};

CHART_SETTINGS.BarChartContainer = {
  '_attributes': {
    'class': 'bar_chart',
    'css': {
      'background-color': 'white',
      'border': '1px solid black'
    }
  }
};

CHART_SETTINGS.BarChartBarArea = {
  '_attributes': {
    'class': 'bar-area'
  }
};

CHART_SETTINGS.BarChartBarValueLabel = {
  '_attributes': {
    'class': 'value-label',
    'css': {
      'text-align': 'center'
    }
  }
};

CHART_SETTINGS.BarChartGraphContent = {
  '_attributes': {
    'class': 'graph-contents'
  }
};

CHART_SETTINGS.BarChartSingleBar = {
  '_attributes': {
    'class': 'single-bar',
    'css': {
      'border': '1px solid black'
    }
  }
};

CHART_SETTINGS.BarChartStackedBar = {
  '_attributes': {
    'class': 'stacked-bar'
  }
};

CHART_SETTINGS.BarChartTitle = {
  '_attributes': {
    'class': 'title',
    'css': {
      'display': 'flex',
      'justify-content': 'center'
    }
  }
};

CHART_SETTINGS.BarChartXAxis = {
  '_attributes': {
    'class': 'x-axis',
    'css': {
      'border-top': '1px solid black',
      'text-align': 'center'
    }
  }
};

CHART_SETTINGS.BarChartXAxisLabel = {
  '_attributes': {
    'class': 'x-axis-label'
  }
};

CHART_SETTINGS.BarChartYAxis = {
  '_attributes': {
    'class': 'y-axis',
    'css': {
      'border-right': '1px solid black'
    }
  }
};

CHART_SETTINGS.BarChartYAxisLabel = {
  '_attributes': {
    'class': 'y-axis-label',
    'css': {
      'text-align': 'right'
    }
  }
};
