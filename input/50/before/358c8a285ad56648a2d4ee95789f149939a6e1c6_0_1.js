function(longitude, latitude, height) {
        /**
         * The longitude, in radians.
         * @type Number
         */
        this.longitude = typeof longitude === 'undefined' ? 0.0 : longitude;

        /**
         * The latitude, in radians.
         * @type Number
         */
        this.latitude = typeof latitude === 'undefined' ? 0.0 : latitude;

        /**
         * The height, in meters, above the ellipsoid.
         * @type Number
         */
        this.height = typeof height === 'undefined' ? 0.0 : height;
    }