function() {
        var s = this._stats;
        if( !s )
            return {};

        // calc mean and standard deviation if necessary
        if( !( 'mean' in s ))
            s.mean = s.sumData / s.basesCovered;
        if( !( 'stdDev' in s ))
            s.stdDev = this._calcStdFromSums( s.sumData, s.sumSquares, s.basesCovered );

        // synonyms for compat
        s.global_min = s.minVal;
        s.global_max = s.maxVal;

        return s;
    }