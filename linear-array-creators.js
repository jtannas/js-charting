/** This is a variation on the idea of building an array from min-max-step.
 *  It expands the outer bounds as needed to ensure that both given bounds
 *  are contained within the returned array. This prevents graph data from
 *  overflowing the numbers returned for a numerical axis.
*/
var linearAxisArray = function(maxLBound, minUBound, step){
  var arr = [];
  var min = maxLBound;
  var max = minUBound;
  if ((max - min) % step !== 0){
    min = Math.floor(min / step) * step;
    max = Math.ceil(max / step) * step;
  }
  for (var x = min; x <= max; x += step){
    arr.push(x);
  }
  return arr;
};


var linearArrayFromMinMaxLen = function(min, max, len){
  var arr = [];
  var step = (max - min) / (len - 1);
  for (var i = 0; i < len; i++){
    arr.push(min + (i * step));
  }
  return arr;
};


var linearArrayFromMinStepLen = function(min, step, len){
  var arr = [];
  for (var i = 0; i < len; i++){
    arr.push(min + (i * step));
  }
  return arr;
};


var linearArrayFromMaxStepLen = function(max, step, len){
  var arr = [];
  for (var i = 0; i < len; i++){
    arr.push(max - (i * step));
  }
  return arr;
};