"use strict";

_c_.HtmlSpec = function(options){
  this._type = options._type || 'div';
  this._attributes = options._attributes || {};
  this._children = options._children || [];
};

_c_.HtmlSpec.new = function(options){
  return new _c_.HtmlSpec(options);
};

_c_.HtmlSpec.prototype = {
  pushChild: function(child){
    this._children.push(child);
  },
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
    this._attributes.css = $.extend(true, this._attributes.css, css);
  }
};

_c_.HtmlSpec.createUsingExtendedOptions = function(specName, optionsArray){
  var newSpec = _c_.HtmlSpec.new({});
  optionsArray.forEach(function(optionsObject){
    $.extend(true, newSpec, optionsObject);
  });
  return newSpec;
};
