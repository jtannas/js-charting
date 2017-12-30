// requires jquery and create-dom-object-from-json.js
// function barChartBarUnits(options){
//   return {
//     'type': 'div',
//     'attributes': {
//       'class': 'units',
//       'innerHTML': amount + units
//     }
//   };
// };

// var barChartBarDescription = function(description){
//   return {
//     'type': 'div',
//     'attributes': {
//       'class': 'description',
//       'innerHTML': description
//     }
//   };
// };

// var barChartBar = {
//   'type': 'li',
//   'attributes': {
//     'class': 'bar',
//     'title': 'title',
//     'css': {
//       'height': '50%',
//       'background': '-webkit-linear-gradient(#999999  , #ffffff)'
//     }
//   },
//   'children': [
//     barChartBarUnits(100, 'mm'),
//     barChartBarDescription('description')
//   ]
// };

// var barChartAxisLabel = {
//   'type': 'div',
//   'attributes': {
//     'class': 'axis-label',
//     'innerHTML': 'XXX%'
//   }
// };

function BarChartAxis(data, options){
  var defaults = {
    'type': 'li',
    'attributes': {
      'class': 'axis',
      'css': {
        'background-color': 'red'
      }
    },
    'children': []
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartAxis'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);
}
BarChartContents.prototype = new HtmlSpec();


function BarChartContents(data, options){
  var defaults = {
    'type': 'ul',
    'attributes': {
      'class': 'contents',
      'css': {
        'background-color': '#012345'
      }
    },
    'children': []
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['BarChartContents'] || {});
  var objSettings = $.extend(true, {}, defaults, userSettings, options.BarChartContents);
  HtmlSpec.call(this, objSettings);

  this.children.push(new BarChartAxis(data, options))
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
    },
    'children': []
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
