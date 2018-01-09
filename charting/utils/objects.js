"use strict";

_c_.utils.objects = {};

_c_.utils.objects.ownKeyIntersection = function(object1, object2){
  var sharedKeys = [];
  for (var property in object1){
    if (object1.hasOwnProperty(property) && object2.hasOwnProperty(property)){
      sharedKeys.push(property);
    }
  }
  return sharedKeys;
};
