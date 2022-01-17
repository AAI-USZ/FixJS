function(maxlength, insertsIndivisible) {
      var c, current, e, result;
      if (index === op.length) return null;
      e = op[index];
      if (typeof (current = e) === 'number' || typeof (current = e.i) === 'number' || (current = e.d) !== void 0) {
        if (!(maxlength != null) || current - offset <= maxlength || (insertsIndivisible && e.i !== void 0)) {
          c = current - offset;
          ++index;
          offset = 0;
        } else {
          offset += maxlength;
          c = maxlength;
        }
        if (e.i !== void 0) {
          return {
            i: c
          };
        } else if (e.d !== void 0) {
          return {
            d: c
          };
        } else {
          return c;
        }
      } else {
        if (!(maxlength != null) || e.i.length - offset <= maxlength || insertsIndivisible) {
          result = {
            i: e.i.slice(offset)
          };
          ++index;
          offset = 0;
        } else {
          result = {
            i: e.i.slice(offset, (offset + maxlength))
          };
          offset += maxlength;
        }
        return result;
      }
    }