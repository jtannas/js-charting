// requires jquery and create-dom-object-from-json.js
var barChartBarUnits = {
  'type': 'div',
  'attributes': {
    'class': 'units',
    'innerHTML': '100mm'
  }
};

var barChartBarDescription =     {
  'type': 'div',
  'attributes': {
    'class': 'description',
    'innerHTML': 'Default description'
  }
};

var barChartBar = {
  'type': 'li',
  'attributes': {
    'class': 'bar',
    'title': 'title',
    'css': {
      'height': '50%',
      'background': '-webkit-linear-gradient(#999999  , #ffffff)'
    }
  },
  'children': [
    barChartBarUnits,
    barChartBarDescription
  ]
};

var barChartAxisLabel = {
  'type': 'div',
  'attributes': {
    'class': 'axis-label',
    'innerHTML': 'XXX%'
  }
};

var barChartAxis = {
  'type': 'li',
  'attributes': {
    'class': 'axis'
  },
  'children': [
    barChartAxisLabel,
    barChartAxisLabel,
    barChartAxisLabel,
    barChartAxisLabel,
    barChartAxisLabel
  ]
};

var barChartContents = {
  'type': 'ul',
  'attributes': {
    'class': 'contents',
    'css': {
      'background-color': '#cccccc'
    }
  },
  'children': [
    barChartAxis,
    barChartBar,
    barChartBar,
    barChartBar,
    barChartBar
  ]
};

var barChartContainer = {
  'type': 'div',
  'attributes': {
    'class': 'bar_chart',
    'css': {
      'height': '500px',
      'width': '500px',
      'background-color': '#eeeeee'
    }
  },
  'children': [barChartContents]
};

var barChartDefaults = {
  '$dom': barChartContainer
};

var drawBarChart = function(data, options, element){
  var settings = $.extend(true, {}, barChartDefaults, options);
  var $chart = createDomObjectFromJson(settings.$dom);
  // TODO: apply data to chart
  // TODO: apply special options
  element.append($chart);
  return $chart;
};
