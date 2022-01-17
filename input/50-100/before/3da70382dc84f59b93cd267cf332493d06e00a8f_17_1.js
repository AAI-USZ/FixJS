function(cartesian) {
        var lon = cartesian.x / this._halfEquatorCircumference;

        var lat = Math.exp(cartesian.y / this._quarterPolarCircumference);
        lat = 2.0 * Math.atan((lat - 1.0) / (lat + 1.0));

        return new Cartographic3(lon * Math.PI, lat * CesiumMath.PI_OVER_TWO, cartesian.z);
    }