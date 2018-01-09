"use strict";

var DataPoint = function(value, options){
  this.value = (value || null);
  $.extend(this, options);
};

DataPoint.new = function(value, options){
  return (new DataPoint(value, options));
};



var DataSeries = function(){
  this.dataPoints = [];
};

DataSeries.prototype.pushPoint = function(dataPoint){
  this.dataPoints.push(dataPoint);
};

DataSeries.prototype.pushNumber = function(number, options){
  this.dataPoints.push(DataPoint.new(number, options));
};

DataSeries.makeFromNumericalArray = function(dataArray){
  var newSeries = new DataSeries();
  dataArray.forEach(function(value){
    var pointName = value.toLocaleString();
    newSeries.pushNumber(value, {name: pointName});
  });
  return newSeries;
};

DataSeries.makeFromDataPointArray = function(dataPointArray){
  var newSeries = new DataSeries();
  newSeries.dataPoints = dataPointArray;
  return newSeries;
};

DataSeries.makeFromBestGuess = function(data){
  if (data instanceof DataSeries){
    return data;
  } else if (data instanceof Array) {
    var dataSeries = new DataSeries();
    data.forEach(function(element){
      if (element instanceof DataPoint){
        dataSeries.pushPoint(element);
      } else if (!isNaN(element)) {
        dataSeries.pushNumber(element);
      } else {
        throw 'Could not create DataPoint from element: ' + element;
      }
    });
    return dataSeries;
  } else {
    throw 'Unable to make data series from provided data';
  }
};

DataSeries.prototype.maxValue = function(){
  return Math.max.apply(null, this.dataPoints.map(function(x){ return x.value; }));
};

DataSeries.prototype.minValue = function(){
  return Math.min.apply(null, this.dataPoints.map(function(x){ return x.value; }));
};

DataSeries.prototype.length = function(){
  return this.dataPoints.length;
};


var DataCluster = function(){
  this.dataSerieses = [];
};

DataCluster.prototype.pushDataSeries = function(dataSeries){
  this.dataSerieses.push(dataSeries);
};

DataCluster.prototype.maxValue = function(){
  return Math.max.apply(null, this.dataSerieses.map(function(dataSeries){ return dataSeries.maxValue(); }));
};

DataCluster.prototype.minValue = function(){
  return Math.max.apply(null, this.dataSerieses.map(function(dataSeries){ return dataSeries.maxValue(); }));
};

DataCluster.prototype.length = function(){
  return this.dataSerieses.length;
};
