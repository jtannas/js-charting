"use strict";

_c_.ChartObject = Object.create(_c_.HtmlSpec);

/** Creates a chart object with a given name, modifying it with the provides options.
 * @param {string} typeName - The name of the chart object in the CHART_DEFINITIONS
    & CHART_SETTINGS & options
 * @param {object} options - options[typeName] is 'folded into' the definition
    of the returned object.
 */
_c_.ChartObject.create = function(typeName, options){
  var definitions = _c_.HtmlSpec.definitions[typeName] || {};
  var settings = _c_.HtmlSpec.settings[typeName] || {};
  var objOptions = options[typeName] || {};
  return this.createUsingExtendedOptions(typeName, [definitions, settings, objOptions]);
};

_c_.ChartObject.prototype.addNewChild = function(typeName, options){
  var newObject = _c_.ChartObject.create(typeName, options);
  if (this[typeName + 'Css']){
    newObject.extendCss(this[typeName + 'Css']);
  }
  this.pushChild(newObject);
  return newObject;
};
