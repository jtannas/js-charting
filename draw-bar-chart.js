// requires jquery and create-dom-object-from-json.js
function BarChartBarUnits(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'units',
      'innerHTML': 'units',
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBarUnits'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);
}
BarChartBarUnits.prototype = new HtmlSpec();

function BarChartBarDescription(options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'description',
      'innerHTML': 'desc'
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);
}
BarChartBarDescription.prototype = new HtmlSpec();

function BarChartBar(options){
  var defaults = {
    'type': 'li',
    'attributes': {
      'class': 'bar',
      'title': 'title',
      'css': {
        'height': '50%',
        'background': '-webkit-linear-gradient(#999999  , #ffffff)'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartBar'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartBarDescription(options));
  this.children.push(new BarChartBarUnits(options));
}
BarChartBar.prototype = new HtmlSpec();

function BarChartAxisLabel(value, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'axis-label',
      'innerHTML': value
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartAxisLabel'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);
}
BarChartAxisLabel.prototype = new HtmlSpec();

function BarChartAxis(data, options){
  var defaults = {
    'type': 'li',
    'attributes': {
      'class': 'axis',
      'css': {
        'background-color': 'red'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartAxis'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);


  this.children.push(new BarChartAxisLabel('0%', options));
  this.children.push(new BarChartAxisLabel('20%', options));
  this.children.push(new BarChartAxisLabel('40%', options));
  this.children.push(new BarChartAxisLabel('60%', options));
  this.children.push(new BarChartAxisLabel('80%', options));
  this.children.push(new BarChartAxisLabel('100%', options));
}
BarChartAxis.prototype = new HtmlSpec();


function BarChartContents(data, options){
  var defaults = {
    'type': 'ul',
    'attributes': {
      'class': 'contents',
      'css': {
        'background-color': '#012345'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartContents'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartAxis(data, options));
  this.children.push(new BarChartBar(options));
}
BarChartContents.prototype = new HtmlSpec();


function BarChart(data, options){
  var defaults = {
    'type': 'div',
    'attributes': {
      'class': 'bar_chart',
      'css': {
        'height': '500px',
        'width': '500px',
        'background-color': '#eeeeee'
      }
    }
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['barChart'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChart);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartContents(data, options));
}
BarChart.prototype = new HtmlSpec();


var drawBarChart = function(data, options, element){
  var $chart = new BarChart(data, options);
  element.append($chart.createElement());
  return $chart;
};
