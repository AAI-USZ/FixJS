function() {
        if (typeof this.cartesian === 'undefined') {
            this.cartesian = wgs84.cartographicArrayToCartesianArray(this.cartographic);
        }
        return this.cartesian;
    }