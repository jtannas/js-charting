$(document).ready(function(){
  var options = {
    title: 'Chart',
    height: '500px'
  };
  drawBarChart([11, 22, 33, 44, 57], options, $('body'));
  var data = [
    new DataPoint(-11, 'a', 'red'),
    new DataPoint(22, 'b', 'blue'),
    new DataPoint(33, 'c', 'green'),
    new DataPoint(44, 'd', 'purple'),
    new DataPoint(57, 'e', 'yellow')
  ];
  options.yAxis = {
    yMax: 100,
    yStep: 10,
    yMin: -100
  }
  drawBarChart(data, options, $('body'));
});

