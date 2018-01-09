"use strict";
function HtmlSpec(options){
  this._type = options._type || 'div';
  this._attributes = options._attributes || {};
  this._children = options._children || [];
}

HtmlSpec.new = function(options){
  return new HtmlSpec(options);
}

HtmlSpec.prototype = {
  pushChild: function(child){
    this._children.push(child);
  },
  createElement: function(){
    var $element = $(document.createElement(this._type));
    $element.setAttrs(this._attributes);
    (this._children).forEach(function(child){
      var $childElement = HtmlSpec.new(child).createElement();
      $element.append($childElement);
    });
    return $element;
  },
  extendCss: function(css){
    this._attributes.css = $.extend(true, this._attributes.css, css);
  }
};

HtmlSpec.createUsingExtendedOptions = function(specName, optionsArray){
  var newSpec = HtmlSpec.new({});
  optionsArray.forEach(function(optionsObject){
    $.extend(true, newSpec, optionsObject);
  });
  return newSpec;
};
