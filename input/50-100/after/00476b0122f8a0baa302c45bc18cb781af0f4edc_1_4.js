function getAdjustedUnit(ms) {
    var next, ams = math.abs(ms), value = ams, unit = 0;
    DateUnitsReversed.slice(1).forEach(function(u, i) {
      next = round(ams / u.multiplier() * 10) / 10 | 0;
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    });
    return [value, unit, ms];
  }