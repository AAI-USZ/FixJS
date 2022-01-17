function(key, encoder) {
          var encodedVal, val;
          val = _this.get(key);
          if (encoder.encode && typeof val !== 'undefined') {
            encodedVal = encoder.encode(val, key, obj, _this);
            if (typeof encodedVal !== 'undefined') {
              return obj[encoder.as] = encodedVal;
            }
          }
        }