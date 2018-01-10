"use strict";

/**
 * Defines the Cluster object, representing an array of Series objects and optional meta data.
 * @constructor
 */
_c_.dataObjects.Cluster = function(options){
  this.dataSerieses = [];
  $.extend(this, options || {});
};

_c_.dataObjects.Cluster.new = function(options){
  return new this(options);
};

_c_.dataObjects.Cluster.prototype.pushDataSeries = function(dataSeries){
  this.dataSerieses.push(dataSeries);
};

_c_.dataObjects.Cluster.prototype.maxValue = function(){
  return Math.max.apply(null, this.dataSerieses.map(function(dataSeries){ return dataSeries.maxValue(); }));
};

_c_.dataObjects.Cluster.prototype.minValue = function(){
  return Math.max.apply(null, this.dataSerieses.map(function(dataSeries){ return dataSeries.maxValue(); }));
};

_c_.dataObjects.Cluster.prototype.length = function(){
  return this.dataSerieses.length;
};

_c_.dataObjects.Cluster.prototype.sum = function(){
  var sum = 0;
  this.dataSerieses.forEach(function(dataSeries){
    sum += dataSeries.sum();
  });
};
