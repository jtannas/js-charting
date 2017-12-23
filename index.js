var DEFAULTS = {
  "container": {
    "width": "640px",
    "height": "480px",
    "background-color": "lightblue",
    "border": "1px solid black"
  }
};

var drawBarChart = function(data,  options,  $element){
  var settings = $.extend(true, {}, DEFAULTS, options);
  var $chart = $(document.createElement('div'));
  $chart.css(settings.container);
  $element.append($chart);
};

$(document).ready(function(){
  drawBarChart([], {}, $('body'));
});
