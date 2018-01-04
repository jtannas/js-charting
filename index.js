// requires jquery and create-dom-object-from-json.js

$(document).ready(function(){
  var options = {
    BarChartTitle: {
      'attributes': {
        'innerHTML': 'Example Chart'
      }
    },
    BarChartContents: {
      'attributes': {
        'css': {
          'height': '500px'
        }
      }
    }
  };
  drawBarChart([11, 22, 33, 44, 55], options, $('body'));
  var data = [
    new DataPoint(11, 'a', 'red'),
    new DataPoint(22, 'b', 'blue'),
    new DataPoint(33, 'c', 'green'),
    new DataPoint(44, 'd', 'white'),
    new DataPoint(55, 'e', 'yellow')
  ];
  drawBarChart(data, options, $('body'));
});

