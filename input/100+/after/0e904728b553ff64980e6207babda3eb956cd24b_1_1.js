function(v, isEnd) {
      if (!isEnd) {
        if (k === undefined) {
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