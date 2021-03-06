"use strict";
/**
 *  Vertical Bar Chart (VBarChart) HtmlSpecs, setters, and getters are defined here
 *  _c_.HtmlSpec.definitions is for functionally required properties
 *  _c_.HtmlSpec.settings is for aesthetic properties or overriding the definitions
 *  These definitions and settings are independent of each other - think of
 *    them as building blocks.
 */


_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartContainer', {
  '_attributes': {
    'css': {
      'box-sizing': 'border-box',
      'display': 'flex',
      'flex-direction': 'column'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartBarArea', {
  '_attributes': {
    'css': {
      'align-items': 'flex-end',
      'display': 'flex',
      'justify-content': 'space-around'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartBarValueLabel', {
  '_attributes': {
    'css': {
      'text-align': 'center'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartGraphContent', {
  '_attributes': {
    'css': {
      'display': 'grid',
      'flex-basis': '0',
      'flex-grow': '1',
      'grid-template-columns': 'max-content auto',
      'grid-template-rows': 'auto max-content'
    }
  },
  VBarChartXAxisCss: {
    'grid-column': '2',
    'grid-row': '2'
  },
  VBarChartYAxisCss: {
    'grid-column': '1',
    'grid-row': '1'
  },
  VBarChartBarAreaCss: {
    'grid-column': '2',
    'grid-row': '1'
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartSingleBar', {
  '_attributes': {
    'css': {
      'position': 'relative',
      'flex-basis': '0',
      'flex-grow': '1'
    }
  },
  setSpacing: function(spacing){
    this._attributes.css['margin-right'] = spacing;
    this._attributes.css['margin-left'] = spacing;
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartStackedBar', {
  '_attributes': {
    'css': {
      'display': 'flexbox',
      'flex-basis': '0',
      'flex-direction': 'column-reverse',
      'flex-grow': '1',
      'justify-content': 'flex-end',
      'position': 'relative'
    }
  },
  setSpacing: function(spacing){
    this._attributes.css['margin-right'] = spacing;
    this._attributes.css['margin-left'] = spacing;
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartStackedNegativeBarSection', {});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartStackedPositiveBarSection', {});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartStackedDataBar', {});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartTitle', {});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartXAxis', {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'row',
      'height': '100%',
      'justify-content': 'space-around'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartXAxisLabel', {
  '_attributes': {
    'css': {
      'flex': '1'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartYAxis', {
  '_attributes': {
    'css': {
      'display': 'flex',
      'flex-direction': 'column-reverse',
      'height': '100%',
      'justify-content': 'space-between'
    }
  }
});

_c_.HtmlSpec.definitions._setObjectDefinition('VBarChartYAxisLabel', {});
