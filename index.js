$(document).ready(function(){
  var options = {
    title: 'Chart',
    height: '500px'
  };
  drawBarChart([11, 22, 33, 44, 57], options, $('body'));
  drawBarChart([-1, -2, -3, -4, -9], options, $('body'));


  options.yAxis = {
    yMin: 10,
    yMax: 35,
    yDivisions: 10
  };
  drawBarChart([15, 20, 25], options, $('body'));
  var data = [
    DataPoint.new(-11, {name: 'a', color: 'red'}),
    DataPoint.new(-22, {name: 'b', color: 'blue'}),
    DataPoint.new(33, {name: 'c', color: 'green'}),
    DataPoint.new(44, {name: 'd', color: 'purple'}),
    DataPoint.new(57, {name: 'e', color: 'yellow'})
  ];
  options.yAxis = {
    yMax: 100,
    yStep: 10,
    yMin: -100
  };
  options.id = 'chart4';
  drawBarChart(data, options, $('body'));
});

