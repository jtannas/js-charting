"use strict";

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartContainer', {
  '_attributes': {
    'css': {
      'box-sizing': 'border-box',
      'display': 'flex',
      'flex-direction': 'column'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartBarArea', {
  '_attributes': {
    'class': 'bar-area',
    'css': {
      'align-items': 'flex-end',
      'display': 'flex',
      'justify-content': 'space-around'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartBarValueLabel', {
  '_attributes': {
    'css': {
      'text-align': 'center'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartGraphContent', {
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

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartSingleBar', {
  '_attributes': {
    'class': 'single-bar',
    'css': {
      'position': 'relative',
      'flex-basis': '0',
      'flex-grow': '1'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartStackedBar', {
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

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartStackedNegativeBarSection', {});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartStackedPositiveBarSection', {});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartStackedDataBar', {});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartTitle', {});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartXAxis', {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'row',
      'height': '100%',
      'justify-content': 'space-around'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartXAxisLabel', {
  '_attributes': {
    'class': 'x-axis-label',
    'css': {
      'flex': '1'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartYAxis', {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column-reverse',
      'height': '100%',
      'justify-content': 'space-between'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('BarChartYAxisLabel', {});
