// requires jquery
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

var getSettingsObject = function(){
  return ("SETTINGS" in window) ? SETTINGS : {};
};

function DomObjectJson(options){
  var defaults = {
    type: 'div',
    attributes: {},
    children: []
  };
  var userSettings = getSettingsObject();
  userSettings = (userSettings['DomObjectJson'] || {});

  var objSettings = $.extend(true, {}, defaults, userSettings, options);
  this.type = objSettings.type;
  this.attributes = objSettings.attributes;
  this.children = objSettings.children;
}

DomObjectJson.prototype = {
  create: function(){
    var $element = $(document.createElement(this.type));
    $element.setAttrs(this.attributes);
    (this.children).forEach(function(child){
      var $childElement = new DomObjectJson(child).create();
      $element.append($childElement);
    });
    return $element;
  }
};
