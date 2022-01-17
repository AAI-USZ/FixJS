function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof result === 'undefined') {
            return new Matrix2(matrix.values.slice(0));
        }
        var values = matrix.values;
        var resultValues = result.values;
        resultValues[0] = values[0];
        resultValues[1] = values[1];
        resultValues[2] = values[2];
        resultValues[3] = values[3];
        return result;
    }