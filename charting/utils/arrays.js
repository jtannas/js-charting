"use strict";

/** Module namespace */
_c_.utils.arrays = {};

/**
 * This is a variation on the idea of building an array from min-max-step.
 * It expands the outer bounds as needed to ensure that both given bounds
 * are contained within the returned array. This prevents graph data from
 * overflowing the numbers returned for a numerical axis.
 * @param {Number} maxLBound - the maximum lower bound of the  returned array
 * @param {Number} maxUBound - the maximum upper bound of the returned array
 * @param {Number} step - the difference between successive array elements
 */
_c_.utils.arrays.linearAxisArray = function(maxLBound, minUBound, step){
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

/**
 * Returns a linearly increasing array defined by its min, max, and length
 * @param {Number} min - the minimum number in the returned array
 * @param {Number} max - the maximum number in the returned array
 * @param {Number} len - the number of elements in the returned array
 */
_c_.utils.arrays.linearArrayFromMinMaxLen = function(min, max, len){
  var arr = [];
  var step = (max - min) / (len - 1);
  for (var i = 0; i < len; i++){
    arr.push(min + (i * step));
  }
  return arr;
};

/**
 * Returns a linearly increasing array defined by its min, step, and length
 * @param {Number} min - the minimum number in the returned array
 * @param {Number} step - the difference between successive array elements
 * @param {Number} len - the number of elements in the returned array
 */
_c_.utils.arrays.linearArrayFromMinStepLen = function(min, step, len){
  var arr = [];
  for (var i = 0; i < len; i++){
    arr.push(min + (i * step));
  }
  return arr;
};

/**
 * Returns a linearly increasing array defined by its max, step, and length
 * @param {Number} max - the maximum number in the returned array
 * @param {Number} step - the difference between successive array elements
 * @param {Number} len - the number of elements in the returned array
 */
_c_.utils.arrays.linearArrayFromMaxStepLen = function(max, step, len){
  var arr = [];
  for (var i = 0; i < len; i++){
    arr.push(max - (i * step));
  }
  return arr;
};

/**
 * Sums each element in an array that returns true from a given test function
 * @param {Array} arr - the array of values to conditionsally sum
 * @param {Function} testFunc - function that for each arr element returns
    true or false based on the element.
 */
_c_.utils.arrays.sumIf = function(arr, testFunc){
  var sum = 0;
  arr.forEach(function(element){
    sum += testFunc(element) === true ? element : 0;
  });
  return sum;
};
