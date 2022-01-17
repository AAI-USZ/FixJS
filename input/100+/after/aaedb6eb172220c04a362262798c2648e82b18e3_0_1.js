function(v) {
      if (k === undefined) {
        // Malformed object with Array as key
        // see:  https://github.com/Sannis/node-ubjson/issues/21
        // test: UnpackMalformedObjectWithArrayKey
        if (Array.isArray(v)) {
          v = new Error(
            'Malformed object. Key must not be an Array. ' +
            'Collected object data: ' + JSON.stringify(o)
          );
          acc = oldAcc;
          acc(v);
          return;
        }

        // Malformed object with Object as key
        // see:  https://github.com/Sannis/node-ubjson/issues/21
        // test: UnpackMalformedObjectWithObjectKey
        if (v.constructor === Object) {
          v = new Error(
            'Malformed object. Key must not be an Object. ' +
            'Collected object data: ' + JSON.stringify(o)
          );
          acc = oldAcc;
          acc(v);
          return;
        }

        // Malformed object with error in key parsing
        // see:  https://github.com/Sannis/node-ubjson/issues/22
        // test: UnpackMalformedObjectWithImpossibleKey
        if (v instanceof Error) {
          v = new Error(
            'Malformed object. Error in key parsing. ' +
            'Collected object data: ' + JSON.stringify(o)
          );
          acc = oldAcc;
          acc(v);
          return;
        }

        k = v;
        return;
      }

      o[k] = v;
      k = undefined;

      numKeys += 1;

      if (numKeys === nvals) {
        acc = oldAcc;
        acc(o);
      }
    }