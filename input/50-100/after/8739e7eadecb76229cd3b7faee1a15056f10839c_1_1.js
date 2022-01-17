function(key, encoder) {
          var encodedVal, val;
          if (encoder.encode) {
            val = _this.get(key);
            if (typeof val !== 'undefined') {
              encodedVal = encoder.encode(val, key, obj, _this);
              if (typeof encodedVal !== 'undefined') {
                return obj[encoder.as] = encodedVal;
              }
            }
          }
        }