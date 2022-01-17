function getPosition(lla, ellipsoid, time, projection) {
        if (typeof time === 'undefined' || time === 0.0 || typeof projection === 'undefined') {
            return ellipsoid.cartographicToCartesian(lla);
        }

        var twod = projection.project(lla);
        twod = new Cartesian3(0.0, twod.x, twod.y);
        return twod.lerp(ellipsoid.cartographicToCartesian(lla), time);
    }