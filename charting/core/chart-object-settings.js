"use strict";

/** Each property of this object is to extend a chart object definition.
 *  The object definitions are in _c_.HtmlSpec.definitions
 *  _c_.HtmlSpec.definitions is for functionally required properties
 *  _c_.HtmlSpec.settings is for aesthetic properties or overriding the definitions
 *  These definitions and settings are independent of each other - think of
 *    them as building blocks.
 */
_c_.HtmlSpec.settings = {};

_c_.HtmlSpec.settings._common = {};

_c_.HtmlSpec.settings._setObjectSettings = function(objName, objSettings){
  this[objName] = $.extend(true, {}, this._common, objSettings);
};
