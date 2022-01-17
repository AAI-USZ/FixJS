function(longitude, latitude, height, result) {
        longitude = typeof longitude === 'undefined' ? 0.0 : CesiumMath.toRadians(longitude);
        latitude = typeof latitude === 'undefined' ? 0.0 : CesiumMath.toRadians(latitude);
        height = typeof height === 'undefined' ? 0.0 : height;

        if (typeof result === 'undefined') {
            return new Cartographic(longitude, latitude, height);
        }

        result.longitude = longitude;
        result.latitude = latitude;
        result.height = height;
        return result;
    }