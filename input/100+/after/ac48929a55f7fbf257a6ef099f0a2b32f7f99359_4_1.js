function(target, source, deep, resolve) {
      var key, val;
      // Strings cannot be reliably merged thanks to
      // their properties not being enumerable in < IE8.
      if(target && typeof source != 'string') {
        for(key in source) {
          if(!hasOwnProperty(source, key) || !target) continue;
          val = source[key];
          // Conflict!
          if(isDefined(target[key])) {
            // Do not merge.
            if(resolve === false) {
              continue;
            }
            // Use the result of the callback as the result.
            if(isFunction(resolve)) {
              val = resolve.call(source, key, target[key], source[key])
            }
          }
          // Deep merging.
          if(deep === true && val && isObjectPrimitive(val)) {
            if(isDate(val)) {
              val = new date(val.getTime());
            } else if(isRegExp(val)) {
              val = new regexp(val.source, getRegExpFlags(val));
            } else {
              if(!target[key]) target[key] = array.isArray(val) ? [] : {};
              object.merge(target[key], source[key], deep, resolve);
              continue;
            }
          }
          target[key] = val;
        }
      }
      return target;
    }