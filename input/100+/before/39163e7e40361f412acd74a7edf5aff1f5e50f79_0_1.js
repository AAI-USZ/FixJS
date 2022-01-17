function (v, axis) {
    var d = new Date(v);

    // first check global format
    if (axis.options.timeFormat)
      return Flotr.Date.format(d, axis.options.timeFormat);
    
    var span = axis.max - axis.min,
        t = axis.tickSize * Flotr.Date.timeUnits[axis.tickUnit];
        
    return Flotr.Date.format(d, Flotr.Date.getFormat(t, span));
  }