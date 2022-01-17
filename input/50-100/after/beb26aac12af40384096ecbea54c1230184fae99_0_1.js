function(ra, dec, redshift) {
      var x, y, z;
      x = redshift * Math.sin(dec) * Math.cos(ra);
      y = redshift * Math.sin(dec) * Math.sin(ra);
      z = redshift * Math.cos(dec);
      return [x, y, z];
    }