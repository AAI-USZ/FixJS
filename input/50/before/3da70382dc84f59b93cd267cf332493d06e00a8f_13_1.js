function(cartesian) {
        var lon = cartesian.x / this._halfEquatorCircumference;
        var lat = cartesian.y / this._quarterPolarCircumference;

        return new Cartographic3(lon * Math.PI, lat * CesiumMath.PI_OVER_TWO, cartesian.z);
    }