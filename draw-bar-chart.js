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

// var barChartAxis = {
//   'type': 'li',
//   'attributes': {
//     'class': 'axis'
//   },
//   'children': [
//     barChartAxisLabel,
//     barChartAxisLabel,
//     barChartAxisLabel,
//     barChartAxisLabel,
//     barChartAxisLabel
//   ]
// };


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
  DomObjectJson.call(this, objSettings);
}
BarChartContents.prototype = new DomObjectJson();


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
  DomObjectJson.call(this, objSettings);

  this.children.push(new BarChartContents(data, options));
}
BarChart.prototype = new DomObjectJson();


var drawBarChart = function(data, options, element){
  var $chart = new BarChart(data, options);
  element.append($chart.create());
  return $chart;
};
