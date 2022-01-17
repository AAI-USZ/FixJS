function(id, cb) {
              var result, _ref3, _ref4;
              result = (_ref3 = (_ref4 = spo[id]) != null ? _ref4.values : void 0) != null ? _ref3 : {};
              if (cb) {
                return cb(null, result);
              } else {
                return result;
              }
            }