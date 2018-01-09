"use strict";

CHART_DEFINITIONS.setObjectDefinition('BarChartContainer', {
  '_attributes': {
    'css': {
      'box-sizing': 'border-box',
      'display': 'flex',
      'flex-direction': 'column'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartBarArea', {
  '_attributes': {
    'class': 'bar-area',
    'css': {
      'align-items': 'flex-end',
      'display': 'flex',
      'justify-content': 'space-around'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartBarValueLabel', {
  '_attributes': {
    'css': {
      'text-align': 'center'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartGraphContent', {
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

CHART_DEFINITIONS.setObjectDefinition('BarChartSingleBar', {
  '_attributes': {
    'class': 'single-bar',
    'css': {
      'position': 'relative',
      'flex-basis': '0',
      'flex-grow': '1'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartStackedBar', {
  '_attributes': {
    'css': {
      'display': 'flexbox',
      'flex-basis': '0',
      'flex-direction': 'column-reverse',
      'flex-grow': '1',
      'justify-content': 'flex-end',
      'position': 'relative'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartStackedNegativeBarSection', {});

CHART_DEFINITIONS.setObjectDefinition('BarChartStackedPositiveBarSection', {});

CHART_DEFINITIONS.setObjectDefinition('BarChartStackedDataBar', {});

CHART_DEFINITIONS.setObjectDefinition('BarChartTitle', {});

CHART_DEFINITIONS.setObjectDefinition('BarChartXAxis', {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'row',
      'height': '100%',
      'justify-content': 'space-around'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartXAxisLabel', {
  '_attributes': {
    'class': 'x-axis-label',
    'css': {
      'flex': '1'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartYAxis', {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column-reverse',
      'height': '100%',
      'justify-content': 'space-between'
    }
  }
});

CHART_DEFINITIONS.setObjectDefinition('BarChartYAxisLabel', {});
