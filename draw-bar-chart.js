// requires jquery and create-dom-object-from-json.js

var barChartDefaults = {};

var drawBarChart = function(data, options, element){
  var settings = $.extend(true, {}, barChartDefaults, options);
  var $chart = createDomObjectFromJSON(settings);
  // TODO: apply data to chart
  // TODO: apply special options
  element.append($chart);
  return $chart;
};
