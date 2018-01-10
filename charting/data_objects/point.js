"use strict";

/**
 * Defines the Point object, representing a single numerical value and optional meta data.
 * @constructor
 */
_c_.dataObjects.Point = function(value, options){
  this.value = (value || null);
  $.extend(this, options || {});
};

_c_.dataObjects.Point.new = function(value, options){
  return (new this(value, options));
};
