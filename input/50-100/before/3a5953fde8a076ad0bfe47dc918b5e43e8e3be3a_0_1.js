function(values) {
        if (typeof values === 'undefined') {
            values = [0, 0, 0, 0];
        }
        else if (!Array.isArray(values)) {
            throw new DeveloperError('values must be an array');
        }

        this[0] = values[0];
        this[1] = values[1];
        this[2] = values[2];
        this[3] = values[3];
    }