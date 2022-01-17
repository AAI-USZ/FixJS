function(extent) {
        if (typeof extent === 'undefined') {
            throw new DeveloperError('extent is required.');
        }

        var north = extent.north;
        if (typeof north === 'undefined') {
            throw new DeveloperError('extent.north is required.');
        }

        if (north < -CesiumMath.PI_OVER_TWO || north > CesiumMath.PI_OVER_TWO) {
            throw new DeveloperError('extent.north must be in the interval [-Pi/2, Pi/2].');
        }

        var south = extent.south;
        if (typeof south === 'undefined') {
            throw new DeveloperError('extent.south is required.');
        }

        if (south < -CesiumMath.PI_OVER_TWO || south > CesiumMath.PI_OVER_TWO) {
            throw new DeveloperError('extent.south must be in the interval [-Pi/2, Pi/2].');
        }

        var west = extent.west;
        if (typeof west === 'undefined') {
            throw new DeveloperError('extent.west is required.');
        }

        if (west < -Math.PI || west > Math.PI) {
            throw new DeveloperError('extent.west must be in the interval [-Pi, Pi].');
        }

        var east = extent.east;
        if (typeof east === 'undefined') {
            throw new DeveloperError('extent.east is required.');
        }

        if (east < -Math.PI || east > Math.PI) {
            throw new DeveloperError('extent.east must be in the interval [-Pi, Pi].');
        }
    }