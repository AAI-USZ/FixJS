function (data) {
              data = data.data;
              if (data.length === 0) {
                callback(null);
              } else if (data.length === 1) {
                // TODO For find, we must pass the callback an Array
                var path = data[0]
                  , value = data[1]
                  , ver = data[2];
                callback(null, value);
              } else {
                throw new Error('Unimplemented');
              }
            }