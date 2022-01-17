function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }

        var column0Row0 = matrix[0];
        var column0Row1 = matrix[3];
        var column0Row2 = matrix[6];
        var column1Row0 = matrix[1];
        var column1Row1 = matrix[4];
        var column1Row2 = matrix[7];
        var column2Row0 = matrix[2];
        var column2Row1 = matrix[5];
        var column2Row2 = matrix[8];

        if (typeof result === 'undefined') {
            return new Matrix3(column0Row0, column1Row0, column2Row0,
                               column0Row1, column1Row1, column2Row1,
                               column0Row2, column1Row2, column2Row2);
        }
        result[0] = column0Row0;
        result[1] = column0Row1;
        result[2] = column0Row2;
        result[3] = column1Row0;
        result[4] = column1Row1;
        result[5] = column1Row2;
        result[6] = column2Row0;
        result[7] = column2Row1;
        result[8] = column2Row2;
        return result;
    }