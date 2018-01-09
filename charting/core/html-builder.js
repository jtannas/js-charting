"use strict";

var ownKeyIntersection = function(object1, object2){
  var sharedKeys = [];
  for (var property in object1){
    if (object1.hasOwnProperty(property) && object2.hasOwnProperty(property)){
      sharedKeys.push(property);
    }
  }
  return sharedKeys;
};


$.fn.extend({
  setAttrs: function(attributesObject){
    return this.each(function() {
      var attributesCopy = $.extend(true, {}, attributesObject);
      var $element = $(this);
      var specialAttrFunctions = {
        'log': console.log,
        'css': $.fn.css.bind($element),
        'html': $.fn.html.bind($element),
        'innerHTML': $.fn.html.bind($element)
      };
      ownKeyIntersection(specialAttrFunctions, attributesCopy).forEach(function(key){
        specialAttrFunctions[key](attributesCopy[key]);
        delete attributesCopy[key];
      });
      $(this).attr(attributesCopy);
    });
  }
});


function HtmlSpec(options){
  this._type = options._type || 'div';
  this._attributes = options._attributes || {};
  this._children = options._children || [];
}
HtmlSpec.prototype = {
  pushChild: function(child){
    this._children.push(child);
  },
  createElement: function(){
    var $element = $(document.createElement(this._type));
    $element.setAttrs(this._attributes);
    (this._children).forEach(function(child){
      var $childElement = new HtmlSpec(child).createElement();
      $element.append($childElement);
    });
    return $element;
  },
  extendCss: function(css){
    this._attributes.css = $.extend(true, this._attributes.css, css);
  }
};
HtmlSpec.createUsingExtendedOptions = function(specName, optionsArray){
  var newSpec = new HtmlSpec({});
  optionsArray.forEach(function(optionsObject){
    $.extend(true, newSpec, optionsObject);
  });
  return newSpec;
};
