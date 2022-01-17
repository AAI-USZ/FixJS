function () {

    var axis      = this,
        o         = axis.options,
        tickSize  = axis.tickSize,
        min       = axis.min,
        max       = axis.max,
        start     = tickSize * Math.ceil(min / tickSize), // Round to nearest multiple of tick size.
        decimals,
        minorTickSize,
        v, v2,
        i, j;
    
    if (o.minorTickFreq)
      minorTickSize = tickSize / o.minorTickFreq;
                      
    // Then store all possible ticks.
    for (i = 0; (v = v2 = start + i * tickSize) <= max; ++i){
      
      // Round (this is always needed to fix numerical instability).
      decimals = o.tickDecimals;
      if (decimals === null) decimals = 1 - Math.floor(Math.log(tickSize) / Math.LN10);
      if (decimals < 0) decimals = 0;
      
      v = v.toFixed(decimals);
      axis.ticks.push({ v: v, label: o.tickFormatter(v, {min : axis.min, max : axis.max}) });

      if (o.minorTickFreq) {
        for (j = 0; j < o.minorTickFreq && (i * tickSize + j * minorTickSize) < max; ++j) {
          v = (v2 + j * minorTickSize).toFixed(decimals);
          axis.minorTicks.push({ v: v, label: o.tickFormatter(v, {min : axis.min, max : axis.max}) });
        }
      }
    }

  }