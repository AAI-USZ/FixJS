function(v, isEnd) {
      if (!isEnd) {
        // Malformed array with error in value parsing
        // see:  https://github.com/Sannis/node-ubjson/issues/23
        // test: UnpackMalformedUnknownLengthArrayWithImpossibleElement
        if (v instanceof Error) {
          // Add partially collected data
          if (typeof v.collectedData !== 'undefined') {
            arr.push(v.collectedData);
          }
          // Create error object
          v = new Error(
            'Malformed array. Error in value parsing. ' +
            'Collected array data: ' + JSON.stringify(arr)
          );
          // Store partially collected data in error object
          v.collectedData = arr;
          // Go up in call stack
          acc = oldAcc;
          acc(v);
          return;
        }

        arr.push(v);
      } else {
        acc = oldAcc;
        acc(arr);
      }
    }