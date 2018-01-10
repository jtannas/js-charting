"use strict";

_c_.dataObjects.Point = function(value, options){
  this.value = (value || null);
  $.extend(this, options || {});
};

_c_.dataObjects.Point.new = function(value, options){
  return (new this(value, options));
};
