function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof result === 'undefined') {
            return new Matrix2([matrix[0], matrix[1], matrix[2], matrix[3]]);
        }
        result[0] = matrix[0];
        result[1] = matrix[1];
        result[2] = matrix[2];
        result[3] = matrix[3];
        return result;
    }