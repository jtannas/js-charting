"use strict";

/** This object contains chart object definitions.
 *  CHART_DEFINITIONS is for functionally required properties
 *  CHART_SETTINGS is for aesthetic properties or overriding the definitions
 *  These definitions and settings are independent of each other - think of
 *    them as building blocks.
 *
 * The object format is 'HtmlSpec', an object defined in html-builder.js
 */
var CHART_DEFINITIONS = {};

CHART_DEFINITIONS._common = {
  clearChildren: function(){
    this._children = [];
  },
  setBackground: function(background){
    this._attributes.css['background'] = background;
  },
  setBackgroundColor: function(backgroundColor){
    this._attributes.css['background-color'] = backgroundColor;
  },
  setBottom: function(bottom){
    this._attributes.css.bottom = bottom;
  },
  setHeight: function(height){
    this._attributes.css.height = height;
  },
  setId: function(id){
    this._attributes.id = id;
  },
  setTitle: function(title){
    this._attributes.title = title;
  },
  setText: function(text){
    this._attributes.innerHTML = text;
  },
  setWidth: function(width){
    this._attributes.css.width = width;
  },
  _type: 'div',
  _attributes: {
    'css': {}
  }
};

CHART_DEFINITIONS.setObjectDefinition = function(objName, objDefinition){
  this[objName] = $.extend(true, {}, this._common, objDefinition);
};
