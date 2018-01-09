"use strict";

var decimalToPercentageText = function(decimal, decimalPlaces){
  var percentage = decimal * 100;
  if (!isNaN(decimalPlaces)){
    percentage = percentage.toFixed(decimalPlaces);
  }
  return percentage + '%';
};

