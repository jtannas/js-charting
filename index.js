keyIntersection = function(object1, object2){
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
      keyIntersection(specialAttrFunctions, attributesCopy).forEach(function(key){
        specialAttrFunctions[key](attributesCopy[key]);
        delete attributesCopy[key];
      });
      $(this).attr(attributesCopy);
    });
  }
});

var createDomObjectFromJson = function(domObjectJson, $parentElement) {
  var $element = $(document.createElement(domObjectJson.type));
  $element.setAttrs(domObjectJson.attributes || {});
  (domObjectJson.children || []).forEach(function(child){
    $element.append(createDomObjectFromJson(child));
  });
  if( $parentElement ) { $parentElement.append($element); }
  return $element;
};

$(document).ready(function(){
  var testData = {
    'type': 'div',
    'attributes': {
      'log': 'The log function call works correctly',
      'data-test': 'test1',
      'css': {
        'width': '640px',
        'height': '480px',
        'background-color': 'lightblue',
        'border': '1px solid black'
      }
    },
    'children': [
      {
        'type': 'p',
        'attributes': {
          'data': 'test2',
          'innerHTML': 'Hello Paragraph!',
          'title': 'paragraph title'
        }
      }
    ]
  };
  createDomObjectFromJson(testData, $('body'));
});
