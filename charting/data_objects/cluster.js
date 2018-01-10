"use strict";

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
