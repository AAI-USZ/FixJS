function (data) {
              data = data.data;
              if (data.length === 0) {
                callback(null);
              } else if (data.length === 1) {
                // TODO For find, we must pass the callback an Array
                var datum = data[0]
                var path = datum[0]
                  , value = datum[1]
                  , ver = datum[2];
                callback(null, value);
              } else {
                throw new Error('Unimplemented');
              }
            }