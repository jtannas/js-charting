"use strict";

var ChartObject = Object.create(_c_.HtmlSpec);

/** Creates a chart object with a given name, modifying it with the provides options.
 * @param {string} typeName - The name of the chart object in the CHART_DEFINITIONS
    & CHART_SETTINGS & options
 * @param {object} options - options[typeName] is 'folded into' the definition
    of the returned object.
 */
ChartObject.create = function(typeName, options){
  var definitions = ('CHART_DEFINITIONS' in window) ? CHART_DEFINITIONS[typeName] || {} : {};
  var settings = ('CHART_SETTINGS' in window) ? CHART_SETTINGS[typeName] || {} : {};
  var objOptions = options[typeName] || {};
  return this.createUsingExtendedOptions(typeName, [definitions, settings, objOptions]);
};

ChartObject.prototype.addNewChild = function(typeName, options){
  var newObject = ChartObject.create(typeName, options);
  if (this[typeName + 'Css']){
    newObject.extendCss(this[typeName + 'Css']);
  }
  this.pushChild(newObject);
  return newObject;
};
