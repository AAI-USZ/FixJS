function stringify(coords) {
      var res = '';
      if ($.isArray(coords)) {
        res = '[';
        for (var i = 0, l = coords.length; i < l; i++) {
          if (i > 0) res += ',';
          res += stringify(coords[i]);
        }
        res += ']';
      }
      else if (typeof coords == 'number') {
        res = coords.toPrecision(6);
      }
      else if (coords.toString) res = coords.toString();

console.log(res);

      return res;
    }