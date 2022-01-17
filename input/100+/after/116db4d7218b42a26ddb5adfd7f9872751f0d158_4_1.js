function(curObject, from, allowedFields) {
      var props = Object.getOwnPropertyNames(from);
      var dest = curObject;

      // add from's properties that are in allowedFields
      props.forEach(function(name) {
        if (name in allowedFields) {
          // recursively apply allowedFields for sub-objects
          if (typeof allowedFields[name] === 'object') {
            if (!dest[name]) {
              dest[name] = {};
            }

            dest[name] = setFields(dest[name], from[name], allowedFields[name]);
          } else {
            var destination = Object.getOwnPropertyDescriptor(from, name);
            if (destination) {
              Object.defineProperty(dest, name, destination);
            }
          }
        }
      });

      return curObject;
    }