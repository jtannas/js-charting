// requires jquery and create-dom-object-from-json.js


function BarChartBarUnits(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'units'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarUnits'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBarUnits);
  HtmlSpec.call(this, objSettings);
}
BarChartBarUnits.prototype = new HtmlSpec();


function BarChartBarDescription(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'description'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarDescription'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBarDescription);
  HtmlSpec.call(this, objSettings);
}
BarChartBarDescription.prototype = new HtmlSpec();


function BarChartBar(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBar);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartBarDescription(options));
  this.children.push(new BarChartBarUnits(options));
}
BarChartBar.prototype = new HtmlSpec();


function BarChartBarArea(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar',
      'css': {
        'grid-column': '2',
        'grid-row': '1',
        'display': 'flex',
        'justify-content': 'space-around'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarArea'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartBarArea);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartBar(options));
  this.children.push(new BarChartBar(options));
  this.children.push(new BarChartBar(options));
  this.children.push(new BarChartBar(options));
  this.children.push(new BarChartBar(options));
}
BarChartBarArea.prototype = new HtmlSpec();


function BarChartYAxisLabel(value, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'y-axis-label',
      'innerHTML': value
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartYAxisLabel'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartYAxisLabel);
  HtmlSpec.call(this, objSettings);
}
BarChartYAxisLabel.prototype = new HtmlSpec();


function BarChartYAxis(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'y-axis',
      'css': {
        'height': '100%',
        'grid-row': '1',
        'grid-column': '1',
        'display': 'flex',
        'flex-direction': 'column'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartYAxis'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartYAxis);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartYAxisLabel('100%', options));
  this.children.push(new BarChartYAxisLabel('80%', options));
  this.children.push(new BarChartYAxisLabel('60%', options));
  this.children.push(new BarChartYAxisLabel('40%', options));
  this.children.push(new BarChartYAxisLabel('20%', options));
  this.children.push(new BarChartYAxisLabel('0%', options));
}
BarChartYAxis.prototype = new HtmlSpec();

function BarChartXAxisLabel(value, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'x-axis-label',
      'innerHTML': value
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartXAxisLabel'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartXAxisLabel);
  HtmlSpec.call(this, objSettings);
}
BarChartXAxisLabel.prototype = new HtmlSpec();


function BarChartXAxis(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'x-axis',
      'css': {
        'height': '100%',
        'grid-row': '2',
        'grid-column': '2',
        'display': 'flex',
        'flex-direction': 'row',
        'justify-content': 'space-around'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartXAxis'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartXAxis);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartXAxisLabel('a', options));
  this.children.push(new BarChartXAxisLabel('b', options));
  this.children.push(new BarChartXAxisLabel('c', options));
  this.children.push(new BarChartXAxisLabel('d', options));
  this.children.push(new BarChartXAxisLabel('e', options));
}
BarChartXAxis.prototype = new HtmlSpec();


function BarChartContents(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'contents',
      'css': {
        'display': 'grid',
        'grid-template-columns': '10% 90%',
        'grid-template-rows': '90% 10%'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartContents'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartYAxis(data, options));
  this.children.push(new BarChartBarArea(data, options));
  this.children.push(new BarChartXAxis(data, options));
}
BarChartContents.prototype = new HtmlSpec();


function BarChartTitle(options){
  var defaults = {
    'type': 'title',
    'attributes': {
      'class': 'title'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartTitle'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartTitle);
  HtmlSpec.call(this, objSettings);
}
BarChartTitle.prototype = new HtmlSpec();


function BarChartLabel(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'label'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartLabel'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartLabel);
  HtmlSpec.call(this, objSettings);
}
BarChartBar.prototype = new HtmlSpec();


function BarChartLabelContainer(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'label-container',
      'css': {
        'display': 'flex',
        'align-items': 'flex-end',
        'justify-content': 'space-between'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartLabelContainer'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartLabelContainer);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartLabel(options));
  this.children.push(new BarChartLabel(options));
  this.children.push(new BarChartLabel(options));
  this.children.push(new BarChartLabel(options));
  this.children.push(new BarChartLabel(options));
  this.children.push(new BarChartLabel(options));
}
BarChartTitle.prototype = new HtmlSpec();


function BarChart(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar_chart',
      'css': {
        'display': 'flex',
        'flex-direction': 'column'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChart'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChart);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartTitle(options));
  this.children.push(new BarChartContents(data, options));
}
BarChart.prototype = new HtmlSpec();


var drawBarChart = function(data, options, element){
  var $chart = new BarChart(data, options);
  element.append($chart.createElement());
  return $chart;
};
