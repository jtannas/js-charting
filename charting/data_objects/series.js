"use strict";

/**
 * Defines the Series object, representing an array of Point objects and optional meta data.
 * @constructor
 */
_c_.dataObjects.Series = function(options){
  this.dataPoints = [];
  $.extend(this, options || {});
};

_c_.dataObjects.Series.prototype.pushPoint = function(dataPoint){
  this.dataPoints.push(dataPoint);
};

_c_.dataObjects.Series.prototype.pushNumber = function(number, options){
  this.dataPoints.push(_c_.dataObjects.Point.new(number, options));
};

_c_.dataObjects.Series.makeFromNumericalArray = function(dataArray, options){
  var newSeries = new this();
  dataArray.forEach(function(value){
    var pointName = value.toLocaleString();
    newSeries.pushNumber(value, {name: pointName});
  });
  $.extend(newSeries, options);
  return newSeries;
};

_c_.dataObjects.Series.makeFromDataPointArray = function(dataPointArray, options){
  var newSeries = new this();
  newSeries.dataPoints = dataPointArray;
  $.extend(newSeries, options);
  return newSeries;
};

/**
 * Alternative constructor function that inspects the given data and makes
 * an attempt at constructing a Series from it.
 */
_c_.dataObjects.Series.makeFromBestGuess = function(data, options){
  if (data instanceof this){
    return data;
  } else if (data instanceof Array) {
    var newSeries = new this();
    data.forEach(function(element){
      if (element instanceof _c_.dataObjects.Point){
        newSeries.pushPoint(element);
      } else if (!isNaN(element)) {
        newSeries.pushNumber(element);
      } else {
        throw 'Could not create DataPoint from element: ' + element;
      }
    });
    $.extend(newSeries, options);
    return newSeries;
  } else {
    throw 'Unable to make data series from provided data';
  }
};

_c_.dataObjects.Series.prototype.maxValue = function(){
  return Math.max.apply(null, this.dataPoints.map(function(x){ return x.value; }));
};

_c_.dataObjects.Series.prototype.minValue = function(){
  return Math.min.apply(null, this.dataPoints.map(function(x){ return x.value; }));
};

_c_.dataObjects.Series.prototype.length = function(){
  return this.dataPoints.length;
};

_c_.dataObjects.Series.prototype.sum = function(){
  var sum = 0;
  this.dataPoints.forEach(function(dataPoint){
    sum += dataPoint.value;
  });
  return sum;
};
