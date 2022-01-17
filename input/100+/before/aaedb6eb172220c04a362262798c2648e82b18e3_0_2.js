function(v, isEnd) {
      if (!isEnd) {
        if (k === undefined) {
          // Malformed object with Array as key
          // see:  https://github.com/Sannis/node-ubjson/issues/21
          // test: UnpackMalformedUnknownLengthObjectWithArrayKey
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
          // test: UnpackMalformedUnknownLengthObjectWithObjectKey
          if (v.constructor === Object) {
            v = new Error(
              'Malformed object. Key must not be an Object. ' +
              'Collected object data: ' + JSON.stringify(o)
            );
            acc = oldAcc;
            acc(v);
            return;
          }

          k = v;
          return;
        }

        // Malformed object with error in value parsing
        // see:  https://github.com/Sannis/node-ubjson/issues/14
        // test: UnpackMalformedUnknownLengthObjectDeep
        if (v instanceof Error) {
          v = new Error(
            'Malformed object. Bad value for key "' + k + '". ' +
            'Collected object data: ' + JSON.stringify(o)
          );
          acc = oldAcc;
          acc(v);
          return;
        }

        o[k] = v;
        k = undefined;
      } else {
        // Malformed object without last value
        // see:  https://github.com/Sannis/node-ubjson/issues/14
        // test: UnpackMalformedUnknownLengthObject
        if (k !== undefined) {
          o = new Error(
            'Malformed unknown-length object. No value for key "' + k + '".' +
            'Collected object data: ' + JSON.stringify(o)
          );
        }

        acc = oldAcc;
        acc(o);
      }
    }