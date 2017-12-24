var DEFAULTS = {
  '$DOM': {
    'type': 'div',
    'css': {
      'width': '640px',
      'height': '480px',
      'background-color': 'lightblue',
      'border': '1px solid black'
    },
    'children': [
      {
        'type': 'p',
        'html': 'Hello World!'
      }
    ]
  }
};

var createDOM = function(rootNodeJSON) {
  var $DOM = $(document.createElement(rootNodeJSON.type));
  $DOM.css(rootNodeJSON.css || {});
  $DOM.html(rootNodeJSON.html || '');
  (rootNodeJSON.children || []).forEach(function(child){
    $DOM.append(createDOM(child));
  });
  return $DOM;
};

var drawBarChart = function(data,  options,  $element){
  var settings = $.extend(true, {}, DEFAULTS, options);
  var $chart = createDOM(settings.$DOM);
  $element.append($chart);
};

$(document).ready(function(){
  drawBarChart([], {}, $('body'));
});
