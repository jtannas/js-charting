"use strict";

/**
 * Represents a specification for an HTML element.
 * Discards any options properties not relevant to it.
 * @constructor
 */
_c_.HtmlSpec = function(options){
  this._type = options._type || 'div';
  this._attributes = options._attributes || {};
  this._children = options._children || [];
};

/**
 * Alternative static constructor-like function
 * Creates a new HTML spec instance from a single option set
 */
_c_.HtmlSpec.new = function(options){
  return new _c_.HtmlSpec(options);
};

/**
 * Alternative static constructor-like function
 * Creates a new HTML spec instance from multiple option sets
 */
_c_.HtmlSpec.createUsingExtendedOptions = function(optionsArray){
  var newSpec = _c_.HtmlSpec.new({});
  optionsArray.forEach(function(optionsObject){
    $.extend(true, newSpec, optionsObject);
  });
  return newSpec;
};


/** Instance methods */
_c_.HtmlSpec.prototype = {

  pushChild: function(child){
    this._children.push(child);
  },

  /**
   * Method to create a jQuery element from the HtmlSpec
   * Recursively creates any children as well
   */
  createElement: function(){
    var $element = $(document.createElement(this._type));
    $element.setAttrs(this._attributes);
    (this._children).forEach(function(child){
      var $childElement = _c_.HtmlSpec.new(child).createElement();
      $element.append($childElement);
    });
    return $element;
  },

  extendCss: function(css){
    this._attributes.css = $.extend(true, this._attributes.css || {}, css);
  }
};
