function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }

        var matrixValues = matrix.values;
        var column0Row0 = matrixValues[0];
        var column1Row0 = matrixValues[2];
        var column0Row1 = matrixValues[1];
        var column1Row1 = matrixValues[3];
        if (typeof result === 'undefined') {
            return new Matrix2([column0Row0, column1Row0,
                                column0Row1, column1Row1]);
        }
        var resultValues = result.values;
        resultValues[0] = column0Row0;
        resultValues[1] = column1Row0;
        resultValues[2] = column0Row1;
        resultValues[3] = column1Row1;
        return result;
    }