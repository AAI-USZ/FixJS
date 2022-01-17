function () {
    var axis = this,
        tu = Flotr.Date.timeUnits,
        spec = Flotr.Date.spec,
        delta = (axis.max - axis.min) / axis.options.noTicks,
        size, unit, i;

    for (i = 0; i < spec.length - 1; ++i) {
      var d = spec[i][0] * tu[spec[i][1]];
      if (delta < (d + spec[i+1][0] * tu[spec[i+1][1]]) / 2 && d >= axis.tickSize)
        break;
    }
    size = spec[i][0];
    unit = spec[i][1];
    
    // special-case the possibility of several years
    if (unit == "year") {
      size = Flotr.getTickSize(axis.options.noTicks*tu.year, axis.min, axis.max, 0);
    }
    
    axis.tickSize = size;
    axis.tickUnit = unit;
    axis.ticks = Flotr.Date.generator(axis);
  }