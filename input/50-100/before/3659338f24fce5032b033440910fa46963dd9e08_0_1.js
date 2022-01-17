function(v) {
      // Malformed array with error in value parsing
      // see:  https://github.com/Sannis/node-ubjson/issues/23
      // test: UnpackMalformedArrayWithImpossibleElement
      if (v instanceof Error) {
        v = new Error(
          'Malformed array. Error in value parsing. ' +
          'Collected array data: ' + JSON.stringify(arr)
        );
        acc = oldAcc;
        acc(v);
        return;
      }

      arr.push(v);

      if (arr.length >= nvals) {
        acc = oldAcc;
        acc(arr);
      }
    }