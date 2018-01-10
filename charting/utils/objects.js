"use strict";

/** Module Namespace */
_c_.utils.objects = {};

/**
 * Given two objects, returns an array of property keys that _they_ share.
 * This excludes keys that they inherited to prevent object defaults from being
 * included.
 * @param {Object} object1 - the first object
 * @param {Object} object2 - the second object
 */
_c_.utils.objects.ownKeyIntersection = function(object1, object2){
  var sharedKeys = [];
  for (var property in object1){
    if (object1.hasOwnProperty(property) && object2.hasOwnProperty(property)){
      sharedKeys.push(property);
    }
  }
  return sharedKeys;
};
