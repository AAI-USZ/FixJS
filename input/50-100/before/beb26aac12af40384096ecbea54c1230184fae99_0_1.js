function(ra, dec, redshift) {
      var x, y, z;
      x = redshift * Math.sin(ra) * Math.cos(dec);
      y = redshift * Math.sin(ra) * Math.sin(dec);
      z = redshift * Math.cos(ra);
      return [x, y, z];
    }