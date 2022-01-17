function(axis, dataPartValues){
        /* DOMAIN */
        var extent = this._getVisibleValueExtentConstrained(axis, dataPartValues),
            dMin = extent.min,
            dMax = extent.max;

         if(pvc.debug >= 3){
             pvc.log("Continuous scale extent: " + JSON.stringify(extent));
         }

        /*
         * If both negative or both positive
         * the scale does not contain the number 0.
         *
         * Currently this option ignores locks. Is this all right?
         */
        var originIsZero = axis.option('OriginIsZero');
        if(originIsZero && (dMin * dMax > 0)){
            if(dMin > 0){
                dMin = 0;
                extent.minLocked = true;
            } else {
                dMax = 0;
                extent.maxLocked = true;
            }
        }

        /*
         * If the bounds (still) are the same, things break,
         * so we add a wee bit of variation.
         *
         * This one must ignore locks.
         */
        if (dMin === dMax) {
            dMin = dMin !== 0 ? dMin * 0.99 : originIsZero ? 0 : -0.1;
            dMax = dMax !== 0 ? dMax * 1.01 : 0.1;
        } else if(dMin > dMax){
            // What the heck...
            // Is this ok or should throw?
            var bound = dMin;
            dMin = dMax;
            dMax = bound;
        }
        
        var scale = new pv.Scale.linear(dMin, dMax);
        
        // Domain rounding
        // Must be done before applying offset
        // because otherwise the offset gets amplified by the rounding
        // Then, the scale range is updated but the ticks cache is not.
        // The result is we end up showing two zones, on each end, with no ticks.
        pvc.roundScaleDomain(scale, axis.option('DomainRoundMode'), axis.option('DesiredTickCount'));

        return scale;
    }