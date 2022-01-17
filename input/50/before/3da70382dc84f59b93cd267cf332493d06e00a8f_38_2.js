function() {
        if (typeof this.cartesian === 'undefined') {
            this.cartesian = wgs84.toCartesians(this.cartographic);
        }
        return this.cartesian;
    }