"use strict";

_c_.utils.css = {};

_c_.utils.css.decimalToPercentageText = function(decimal, decimalPlaces){
  var percentage = decimal * 100;
  if (!isNaN(decimalPlaces)){
    percentage = percentage.toFixed(decimalPlaces);
  }
  return percentage + '%';
};

