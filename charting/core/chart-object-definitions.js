"use strict";

/** This object contains chart object definitions.
 *  _c_.HtmlSpec.definitions is for functionally required properties
 *  _c_.HtmlSpec.settings is for aesthetic properties or overriding the definitions
 *  These definitions and settings are independent of each other - think of
 *    them as building blocks.
 */
_c_.HtmlSpec.definitions = {};

_c_.HtmlSpec.definitions._common = {
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

_c_.HtmlSpec.definitions._setObjectDefinition = function(objName, objDefinition){
  this[objName] = $.extend(true, {}, this._common, objDefinition);
};
