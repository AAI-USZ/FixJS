function multiMatch(el, match, scope, params) {
    var result = true, isObjectPrimitive = typeof el === 'object';
    if(el === match) {
      // Match strictly equal values up front.
      return true;
    } else if(object.isRegExp(match) && !isObjectPrimitive) {
      // Match against a regexp
      return regexp(match).test(el);
    } else if(object.isFunction(match)) {
      // Match against a filtering function
      return match.apply(scope, [el].concat(params));
    } else if(object.isObject(match) && isObjectPrimitive) {
      // Match against a hash or array.
      iterateOverObject(match, function(key, value) {
        if(!multiMatch(el[key], match[key], scope, params)) {
          result = false;
        }
      });
      return object.keys(match).length > 0 && result;
    } else {
      return object.equal(el, match);
    }
  }