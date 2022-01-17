function() {
        if (typeof this.cartographic === 'undefined') {
            this.cartographic = wgs84.toCartographic3s(this.cartesian);
        }
        return this.cartographic;
    }