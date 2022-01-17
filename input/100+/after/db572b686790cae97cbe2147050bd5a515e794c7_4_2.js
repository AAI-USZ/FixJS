function(matrix, scalar, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof scalar !== 'number') {
            throw new DeveloperError('scalar is required and must be a number');
        }

        var matrixValues = matrix.values;
        if (typeof result === 'undefined') {
            return new Matrix2([matrixValues[0] * scalar, matrixValues[1] * scalar,
                                matrixValues[2] * scalar, matrixValues[3] * scalar]);
        }
        var resultValues = result.values;
        resultValues[0] = matrixValues[0] * scalar;
        resultValues[1] = matrixValues[1] * scalar;
        resultValues[2] = matrixValues[2] * scalar;
        resultValues[3] = matrixValues[3] * scalar;
        return result;
    }