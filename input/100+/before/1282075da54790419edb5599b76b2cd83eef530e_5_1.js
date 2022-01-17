function(object, otherObject) {
    // Merges two objects together, then returns the final object
    // - if no matching value is found it will create a new one otherwise it will overwrite the old
    // - one, also supports deep merging automatically
    object = object || {};
    otherObject = otherObject || {};
    var i, key, value;

    for(i in otherObject) {
      key = i, value = otherObject[key];

      try {
        // Update value of object to the one from otherObject
        object[key] = typeof value === 'object' ? merge(object[key], value) : value;
      } catch(err) {
        // Object isn't set so set it
        object[key] = value;
      }
    }
    return object;
  }