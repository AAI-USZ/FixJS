function(extent, ellipsoid, time, projection) {
        if (typeof extent === 'undefined') {
            throw new DeveloperError('extent is required.');
        }

        Extent.validate(extent);

        ellipsoid = ellipsoid || Ellipsoid.WGS84;
        var positions = [];

        var lla = new Cartographic3(extent.west, extent.north, 0.0);
        positions.push(getPosition(lla, ellipsoid, time, projection));
        lla.longitude = extent.east;
        positions.push(getPosition(lla, ellipsoid, time, projection));
        lla.latitude = extent.south;
        positions.push(getPosition(lla, ellipsoid, time, projection));
        lla.longitude = extent.west;
        positions.push(getPosition(lla, ellipsoid, time, projection));

        if (extent.north < 0.0) {
            lla.latitude = extent.north;
        } else if (extent.south > 0.0) {
            lla.latitude = extent.south;
        } else {
            lla.latitude = 0.0;
        }

        for ( var i = 1; i < 8; ++i) {
            var temp = -Math.PI + i * CesiumMath.PI_OVER_TWO;
            if (extent.west < temp && temp < extent.east) {
                lla.longitude = temp;
                positions.push(getPosition(lla, ellipsoid, time, projection));
            }
        }

        if (lla.latitude === 0.0) {
            lla.longitude = extent.west;
            positions.push(getPosition(lla, ellipsoid, time, projection));
            lla.longitude = extent.east;
            positions.push(getPosition(lla, ellipsoid, time, projection));
        }

        return positions;
    }