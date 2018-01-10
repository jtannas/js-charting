"use strict";

/** Provides a globally accessible alias for drawing bar charts */
var drawBarChart = function(data, options, element){
  if (data instanceof _c_.dataObjects.Cluster){
    return _c_.draw.stackedVerticalBarChart(data, options, element);
  } else {
    return _c_.draw.simpleVerticalBarChart(data, options, element);
  }
};
