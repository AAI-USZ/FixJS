function(longitude, latitude, height) {
        /**
         * The longitude, in radians.
         * @type Number
         */
        this.longitude = defaultValue(longitude, 0.0);

        /**
         * The latitude, in radians.
         * @type Number
         */
        this.latitude = defaultValue(latitude, 0.0);

        /**
         * The height, in meters, above the ellipsoid.
         * @type Number
         */
        this.height = defaultValue(height, 0.0);
    }