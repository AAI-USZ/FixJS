function(windowPosition, projection) {
        if (typeof windowPosition === 'undefined') {
            throw new DeveloperError('windowPosition is required.');
        }

        if (typeof projection === 'undefined') {
            throw new DeveloperError('projection is required.');
        }

        var ray = this._getPickRayOrthographic(windowPosition);
        var position = ray.origin;
        position.z = 0.0;
        var cart = projection.unproject(position);

        if (cart.latitude < -CesiumMath.PI_OVER_TWO || cart.latitude > CesiumMath.PI_OVER_TWO ||
                cart.longitude < - Math.PI || cart.longitude > Math.PI) {
            return undefined;
        }

        return projection.getEllipsoid().cartographicToCartesian(cart);
    }