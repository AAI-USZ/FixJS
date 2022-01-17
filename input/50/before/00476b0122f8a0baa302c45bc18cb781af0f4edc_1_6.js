function(u, i) {
      next = (ams / u.multiplier() * 10).round() / 10 | 0;
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    }