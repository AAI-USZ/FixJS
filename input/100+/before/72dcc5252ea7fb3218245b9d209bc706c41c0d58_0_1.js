function(otherArray, options) {
    var opts = options || {},
      i, j,
      equal,
      cssprop,
      len;
    if ($.isArray(otherArray)) { // simple case of array values
      if (!options) { // if nothing in options is specified
        len = otherArray.length;
        if (this.size() !== len) { // don't compare arrays of different size
          return false;
        }
        for (i = 0; i < len; i++) { // are the values equal
          equal = this.value(i) === otherArray[i];
          if (!equal) { return false; }
        }
        return true; // if tests passed, arrays are equal
      } else { // if options
        if ('css' in opts) { // if css property given, compare given array to property
          cssprop = opts.css;
          for (i = 0; i < len; i++) {
            equal = this.css(i, cssprop) === otherArray[i];
            if (!equal) { return false; }
          }
          return true; // if tests passed, arrays are equal
        }
      }
    } else { // JSAV array
      len = otherArray.size();
      if (this.size() !== len) { // size check
        return false;
      }
      if (!('value' in opts) || opts.value) { // if comparing values
        for (i = 0; i < len; i++) {
          equal = this.value(i) === otherArray.value(i);
          if (!equal) { return false; }
        }
      }
      if ('css' in opts) { // if comparing css properties
        if ($.isArray(opts.css)) { // array of property names
          for (i = 0; i < opts.css.length; i++) {
            cssprop = opts.css[i];
            for (j = 0; j < len; j++) {
              equal = this.css(j, cssprop) === otherArray.css(j, cssprop);
              if (!equal) { return false; }
            }
          }
        } else { // if not array, expect it to be a property name string
          cssprop = opts.css;
          for (i = 0; i < len; i++) {
            equal = this.css(i, cssprop) === otherArray.css(i, cssprop);
            if (!equal) { return false; }
          }
        }
      }
      return true; // if tests passed, arrays are equal
    }
    
    // default: return false
    return false;
  }