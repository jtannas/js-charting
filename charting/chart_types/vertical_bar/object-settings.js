"use strict";
/**
 * Vertical Bar Chart (VBarChart) HtmlSpecs supplementary properties are defined here
 *  _c_.HtmlSpec.definitions is for functionally required properties
 *  _c_.HtmlSpec.settings is for aesthetic properties or overriding the definitions
 *  These definitions and settings are independent of each other - think of
 *    them as building blocks.
 */


_c_.HtmlSpec.settings._setObjectSettings('VBarChartContainer', {
  '_attributes': {
    'class': 'bar-chart',
    'css': {
      'background-color': 'white',
      'border': '1px solid black'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartBarArea', {
  'class': 'bar-area',
  '_attributes': {
    'class': 'bar-area'
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartBarValueLabel', {
  '_attributes': {
    'class': 'value-label',
    'css': {
      'text-align': 'center'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartGraphContent', {
  '_attributes': {
    'class': 'graph-contents'
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartSingleBar', {
  '_attributes': {
    'class': 'single-bar',
    'css': {
      'border': '1px solid black'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartStackedBar', {
  '_attributes': {
    'class': 'stacked-bar'
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartStackedNegativeBarSection', {
  '_attributes': {
    'class': 'negative-portion'
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartStackedPositiveBarSection', {
  '_attributes': {
    'class': 'positive-portion'
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartStackedDataBar', {
  '_attributes': {
    'class': 'stacked-inner-bar',
    'css': {
      'border': '1px solid black'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartTitle', {
  '_attributes': {
    'class': 'title',
    'css': {
      'display': 'flex',
      'justify-content': 'center'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartXAxis', {
  '_attributes': {
    'class': 'x-axis',
    'css': {
      'border-top': '1px solid black',
      'text-align': 'center'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartXAxisLabel', {
  '_attributes': {
    'class': 'x-axis-label'
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartYAxis', {
  '_attributes': {
    'class': 'y-axis',
    'css': {
      'border-right': '1px solid black'
    }
  }
});

_c_.HtmlSpec.settings._setObjectSettings('VBarChartYAxisLabel', {
  '_attributes': {
    'class': 'y-axis-label',
    'css': {
      'text-align': 'right'
    }
  }
});
