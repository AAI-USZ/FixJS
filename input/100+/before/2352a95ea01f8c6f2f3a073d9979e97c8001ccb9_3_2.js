function(matrix, index, cartesian, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof cartesian === 'undefined') {
            throw new DeveloperError('cartesian is required');
        }
        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index is required and must be 0 or 1.');
        }

        var startIndex = index;
        result = Matrix2.clone(matrix, result);
        result[startIndex] = cartesian.x;
        result[startIndex + 2] = cartesian.y;
        return result;
    }