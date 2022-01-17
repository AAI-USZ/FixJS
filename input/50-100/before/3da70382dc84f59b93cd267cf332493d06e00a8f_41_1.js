function(projection) {
        if (typeof projection === 'undefined') {
            throw new DeveloperError('projection is required.');
        }

        this._projection = projection;
        this._maxCoord = projection.project(new Cartographic3(Math.PI, CesiumMath.toRadians(85.05112878)));
    }