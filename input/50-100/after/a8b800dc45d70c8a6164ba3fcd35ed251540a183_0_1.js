function(pos) {
        for (var s = 0; s < this._ranges.length; ++s) {
            var r = this._ranges[s];
            if ( r.min <= pos && r.max >= pos ) {
                return true;
            }
        }
        return false;
    }