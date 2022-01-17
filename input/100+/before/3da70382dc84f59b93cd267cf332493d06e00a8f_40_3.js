function(windowPosition, projection) {
        if (typeof windowPosition === 'undefined') {
            throw new DeveloperError('windowPosition is required.');
        }

        if (typeof projection === 'undefined') {
            throw new DeveloperError('projection is required.');
        }

        var ray = this._getPickRayPerspective(windowPosition);
        var scalar = -ray.origin.x / ray.direction.x;
        var position = ray.getPoint(scalar);

        var cart = projection.unproject(new Cartesian3(position.y, position.z, 0.0));

        if (cart.latitude < -CesiumMath.PI_OVER_TWO || cart.latitude > CesiumMath.PI_OVER_TWO ||
                cart.longitude < - Math.PI || cart.longitude > Math.PI) {
            return undefined;
        }

        position = projection.getEllipsoid().toCartesian(cart);
        return position;
    }