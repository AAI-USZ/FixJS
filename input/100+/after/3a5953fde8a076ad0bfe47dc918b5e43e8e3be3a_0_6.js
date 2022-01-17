function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }

        var column0Row0 = matrix[0];
        var column1Row0 = matrix[2];
        var column0Row1 = matrix[1];
        var column1Row1 = matrix[3];
        if (typeof result === 'undefined') {
            return new Matrix2(column0Row0, column1Row0,
                               column0Row1, column1Row1);
        }
        result[0] = column0Row0;
        result[1] = column1Row0;
        result[2] = column0Row1;
        result[3] = column1Row1;
        return result;
    }