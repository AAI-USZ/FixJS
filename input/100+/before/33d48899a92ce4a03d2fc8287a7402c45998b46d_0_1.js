function() {
      var data, r, step, val, _ref;
      data = [];
      for (r = 0, _ref = gradient.length - 1; 0 <= _ref ? r <= _ref : r >= _ref; 0 <= _ref ? r++ : r--) {
        if (spectrum !== void 0) {
          step = Math.floor(spectrum.length / gradient.length);
          if (spectrum[r * step] !== void 0) {
            val = spectrum[10 + r * step / 2] * 500;
            if (val > 1) val = 1 - Math.random() * 0.4;
            val *= gradient[r];
          } else {
            val = 0;
          }
        }
        if (val <= 0.01) val = noise();
        data.push(val);
      }
      return data;
    }