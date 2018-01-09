"use strict";

/** Each property of this object is to extend a chart object definition.
 *  The object definitions are in the CHART_DEFINITIONS.
 *  CHART_DEFINITIONS is for functionally required properties
 *  CHART_SETTINGS is for aesthetic properties or overriding the definitions
 *  These definitions and settings are independent of each other - think of
 *    them as building blocks.
 *
 * The object format is 'HtmlSpec', an object defined in html-builder.js
 */
var CHART_SETTINGS = {};

CHART_SETTINGS._common = {};

CHART_SETTINGS.setObjectSettings = function(objName, objSettings){
  this[objName] = $.extend(true, {}, this._common, objSettings);
};
