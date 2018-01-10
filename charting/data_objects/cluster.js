"use strict";

_c_.dataObjects.Cluster = function(){
  this.dataSerieses = [];
};

_c_.dataObjects.Cluster.new = function(){
  return new this();
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
