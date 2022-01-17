function(cartesian, result) {
        if (typeof cartesian === 'undefined') {
            throw new DeveloperError('cartesian is required');
        }

        if (typeof result === 'undefined') {
            return new Cartesian3(cartesian.x, cartesian.y, cartesian.z);
        }

        result.x = cartesian.x;
        result.y = cartesian.y;
        result.z = cartesian.z;
        return result;
    }