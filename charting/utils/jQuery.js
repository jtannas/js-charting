"use strict";

/**
 * Sets the attributes of a jQuery element from an attributes object.
 *
 * jQuery has special functions for applying certain attributes to elements.
 * e.g. $.css allows an object of css properties to be applied as a style string
 * e.g. *.html sets the inner HTML of an object
 *
 * This function is a passthrough to these functions, allowing all HTML attributes
 * to be specified using a single object.
 *
 * @param {object} attributesObject - an object whose properties match HTML attributes
 */
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
