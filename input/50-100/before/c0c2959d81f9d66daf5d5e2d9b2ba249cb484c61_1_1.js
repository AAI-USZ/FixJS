function(cartesian, result) {
        if (typeof result === 'undefined') {
            return new Cartesian3(cartesian.x, cartesian.y, cartesian.z);
        }
        result.x = cartesian.x;
        result.y = cartesian.y;
        result.z = cartesian.z;
        return result;
    }