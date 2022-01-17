function(src, code, add) {
      var to = [], loc = this;
      if(add !== false) loc.formats.push(src);

      src = getOptionalSpacing(src).replace(/\{(.+?)\}/g, function(all, k) {
        var opt = k.match(/\?$/), slice = k.match(/(\d)(?:-(\d))?/), nc = k.match(/^\d+$/), key = k.replace(/[^a-z]+$/, ''), value, arr;
        if(key === 'time') {
          to = to.concat(TimeFormat);
          return prepareTime(RequiredTime, loc);
        }
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
          value = value.compact().join('|');
        }
        if(nc) {
          return '(?:' + value + ')?';
        } else {
          to.push(key);
          return '(' + value + ')' + (opt ? '?' : '');
        }
      });
      window.foo = window.foo || [];
      to = to.concat(TimeFormat);
      src += prepareTime(OptionalTime, loc);
      window.foo.push(new RegExp(src));
      addDateInputFormat(src, to, code);
    }