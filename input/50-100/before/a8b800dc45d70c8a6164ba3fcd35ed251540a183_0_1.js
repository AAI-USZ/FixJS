function(pos) {
        for (var s = 0; s < this._ranges.length; ++s) {
            if (this._ranges[s].contains(pos)) {
                return true;
            }
        }
        return false;
    }