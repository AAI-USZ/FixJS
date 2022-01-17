function(values, result) {
        if (!Array.isArray(values)) {
            throw new DeveloperError('values must be an array');
        }

        if (typeof result === 'undefined') {
            return new Matrix2([values[0], values[2],
                                values[1], values[3]]);
        }
        result[0] = values[0];
        result[1] = values[2];
        result[2] = values[1];
        result[3] = values[3];
        return result;
    }