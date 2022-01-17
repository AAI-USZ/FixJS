function(matrix, scalar, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof scalar !== 'number') {
            throw new DeveloperError('scalar is required and must be a number');
        }

        if (typeof result === 'undefined') {
            return new Matrix2(matrix[0] * scalar, matrix[1] * scalar,
                               matrix[2] * scalar, matrix[3] * scalar);
        }
        result[0] = matrix[0] * scalar;
        result[1] = matrix[1] * scalar;
        result[2] = matrix[2] * scalar;
        result[3] = matrix[3] * scalar;
        return result;
    }