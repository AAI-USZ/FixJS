function(matrix, index, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required.');
        }

        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index is required and must be 0 or 1.');
        }

        var x = matrix[index];
        var y = matrix[index + 2];

        if (typeof result === 'undefined') {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    }