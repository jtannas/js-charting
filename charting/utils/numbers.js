"use strict";

/** Module Namespace */
_c_.utils.numbers = {};

/**
 * Returns a given number constrained between a minimum and a maximum
 * @param {Number} x - the number to constrain
 * @param {Number} min - the minimum the result is allowed to be
 * @param {Number} max - the maximum the result is allowed to be
 */
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

/**
 * Converts a number in decimal to percentage
 * @param {Number} decimal - the number to convert
 * @param {Number} decimalPlaces - the number of digits after the decimal place
    in the returned text
 */
_c_.utils.numbers.decimalToPercentageText = function(decimal, decimalPlaces){
  var percentage = decimal * 100;
  if (!isNaN(decimalPlaces)){
    percentage = percentage.toFixed(decimalPlaces);
  }
  return percentage + '%';
};
