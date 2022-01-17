function(other, epsilon) {
        epsilon = epsilon || 0.0;
        var thisValues = this.values;
        var otherValues = other.values;
        for ( var i = 0, len = thisValues.length; i < len; i++) {
            if (Math.abs(thisValues[i] - otherValues[i]) > epsilon) {
                return false;
            }
        }
        return true;
    }