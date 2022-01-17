function(d, loc, n, format) {
        var str = loc['12hr'][d.getHours() / 12 | 0];
        if(format.length === 1) str = str.slice(0,1);
        if(format.slice(0,1) === 'T') str = str.toUpperCase();
        return str;
      }