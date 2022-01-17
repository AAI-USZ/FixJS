function(matrix, scalar, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof scalar !== 'number') {
            throw new DeveloperError('scalar is required and must be a number');
        }

        if (typeof result === 'undefined') {
            return new Matrix3(matrix[0] * scalar, matrix[3] * scalar, matrix[6] * scalar,
                               matrix[1] * scalar, matrix[4] * scalar, matrix[7] * scalar,
                               matrix[2] * scalar, matrix[5] * scalar, matrix[8] * scalar);
        }
        result[0] = matrix[0] * scalar;
        result[1] = matrix[1] * scalar;
        result[2] = matrix[2] * scalar;
        result[3] = matrix[3] * scalar;
        result[4] = matrix[4] * scalar;
        result[5] = matrix[5] * scalar;
        result[6] = matrix[6] * scalar;
        result[7] = matrix[7] * scalar;
        result[8] = matrix[8] * scalar;
        return result;
    }