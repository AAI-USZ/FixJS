function(cartesian) {
        if (typeof cartesian === 'undefined') {
            throw new DeveloperError('cartesian is required');
        }
        return Math.max(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
    }