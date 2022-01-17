function WebMercatorTilingScheme(description) {
        description = defaultValue(description, {});

        /**
         * The ellipsoid whose surface is being tiled.
         *
         * @type Ellipsoid
         */
        this.ellipsoid = defaultValue(description.ellipsoid, Ellipsoid.WGS84);

        /**
         * The number of tiles in the X direction at level zero of the tile tree.
         *
         * @type Number
         */
        this.numberOfLevelZeroTilesX = description.numberOfLevelZeroTilesX || 1;

        /**
         * The number of tiles in the Y direction at level zero of the tile tree.
         *
         * @type Number
         */
        this.numberOfLevelZeroTilesY = description.numberOfLevelZeroTilesY || 1;

        /**
         * The world extent covered by this tiling scheme, in radians.
         *
         * @type Extent
         */
        this.extent = undefined;

        /**
         * The maximum error, in meters, that can exist in the surface geometry at tile level zero.
         * Tile level one is assumed to have half this error, level two is assumed to have
         * half the error of level one, and so on down the tile pyramid.
         *
         * @type Number
         */
        this.levelZeroMaximumGeometricError = this.ellipsoid.getRadii().x * 2 * Math.PI / 512;

        if (typeof description.extentSouthwestInMeters !== 'undefined' &&
            typeof description.extentNortheastInMeters !== 'undefined') {
            this._extentSouthwestInMeters = description.extentSouthwestInMeters;
            this._extentNortheastInMeters = description.extentNortheastInMeters;
        } else {
            var semimajorAxisTimesPi = this.ellipsoid.getRadii().x * Math.PI;
            this._extentSouthwestInMeters = new Cartesian2(-semimajorAxisTimesPi, -semimajorAxisTimesPi);
            this._extentNortheastInMeters = new Cartesian2(semimajorAxisTimesPi, semimajorAxisTimesPi);
        }

        var southwest = this.webMercatorToCartographic(this._extentSouthwestInMeters.x, this._extentSouthwestInMeters.y);
        var northeast = this.webMercatorToCartographic(this._extentNortheastInMeters.x, this._extentNortheastInMeters.y);
        this.extent = new Extent(
                southwest.longitude,
                southwest.latitude,
                northeast.longitude,
                northeast.latitude);
    }