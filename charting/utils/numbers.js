"use strict";

_c_.utils.numbers = {};

_c_.utils.numbers.constrainBetween = function(x, min, max){
  var result;
  if (x < min){
    result = min;
  } else if (x > max) {
    result = max;
  } else {
    result = x;
  }
  return result;
};
