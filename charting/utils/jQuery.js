"use strict";

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
      var intersect = _c_.utils.objects.ownKeyIntersection;
      intersect(specialAttrFunctions, attributesCopy).forEach(function(key){
        specialAttrFunctions[key](attributesCopy[key]);
        delete attributesCopy[key];
      });
      $(this).attr(attributesCopy);
    });
  }
});
