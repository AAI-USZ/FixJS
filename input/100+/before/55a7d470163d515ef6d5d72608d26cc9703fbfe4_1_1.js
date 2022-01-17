function(src, allowsTime, match, variant, iso) {
      var to = match || [], loc = this, time, lastIsNumeral;

      src = src.replace(/\s+/g, '[-,. ]*');
      src = src.replace(/\{([^,]+?)\}/g, function(all, k) {
        var opt = k.match(/\?$/), slice = k.match(/(\d)(?:-(\d))?/), nc = k.match(/^\d+$/), key = k.replace(/[^a-z]+$/, ''), value, arr;
        if(nc) {
          value = loc['optionals'][nc[0]];
        } else if(loc[key]) {
          value = loc[key];
        } else if(loc[key + 's']) {
          value = loc[key + 's'];
          if(slice) {
            // Can't use filter here as Prototype hijacks the method and doesn't
            // pass an index, so use a simple loop instead!
            arr = [];
            value.forEach(function(m, i) {
              var mod = i % (loc['units'] ? 8 : value.length);
              if(mod >= slice[1] && mod <= (slice[2] || slice[1])) {
                arr.push(m);
              }
            });
            value = arr;
          }
          value = arrayToAlternates(value);
        }
        if(nc) {
          return '(?:' + value + ')?';
        } else {
          if(!match) {
            to.push(key);
          }
          return '(' + value + ')' + (opt ? '?' : '');
        }
      });
      if(allowsTime) {
        time = prepareTime(RequiredTime, this, iso)
        lastIsNumeral = src.match(/\\d\{\d,\d\}\)+\??$/);
        addDateInputFormat(this, '(?:' + time + ')[,\\s\\u3000]+?' + src, TimeFormat.concat(to), variant);
        addDateInputFormat(this, src + '(?:[,\\s]*(?:t|at |[\\s\\u3000]'+ (lastIsNumeral ? '+' : '*') +')' + time + ')?', to.concat(TimeFormat), variant);
      } else {
        addDateInputFormat(this, src, to, variant);
      }
    }