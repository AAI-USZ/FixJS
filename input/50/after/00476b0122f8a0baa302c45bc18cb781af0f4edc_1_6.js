function(u, i) {
      next = round(ams / u.multiplier() * 10) / 10 | 0;
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    }