function() {
        if (typeof this.cartographic === 'undefined') {
            this.cartographic = wgs84.cartesianArrayToCartographicArray(this.cartesian);
        }
        return this.cartographic;
    }