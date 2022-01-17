function(extent) {
        if (!extent ||
                typeof extent.north === 'undefined' ||
                typeof extent.south === 'undefined' ||
                typeof extent.west === 'undefined' ||
                typeof extent.east === 'undefined') {
            throw new DeveloperError('extent is required and must have north, south, east and west attributes.');
        }

        if (extent.north < -CesiumMath.PI_OVER_TWO || extent.north > CesiumMath.PI_OVER_TWO) {
            throw new DeveloperError('extent.north must be in the interval [-Pi/2, Pi/2].');
        }

        if (extent.south < -CesiumMath.PI_OVER_TWO || extent.south > CesiumMath.PI_OVER_TWO) {
            throw new DeveloperError('extent.south must be in the interval [-Pi/2, Pi/2].');
        }

        if (extent.west < -CesiumMath.PI || extent.west > CesiumMath.PI) {
            throw new DeveloperError('extent.west must be in the interval [-Pi, Pi].');
        }

        if (extent.east < -CesiumMath.PI || extent.east > CesiumMath.PI) {
            throw new DeveloperError('extent.east must be in the interval [-Pi, Pi].');
        }
    }