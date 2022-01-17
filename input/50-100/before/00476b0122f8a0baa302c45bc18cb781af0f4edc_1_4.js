function getAdjustedUnit(ms) {
    var next, ams = ms.abs(), value = ams, unit = 0;
    DateUnitsReversed.slice(1).forEach(function(u, i) {
      next = (ams / u.multiplier() * 10).round() / 10 | 0;
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    });
    return [value, unit, ms];
  }