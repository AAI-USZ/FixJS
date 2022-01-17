function(left, right, result) {
        if (typeof left === 'undefined') {
            throw new DeveloperError('left is required');
        }
        if (typeof right === 'undefined') {
            throw new DeveloperError('right is required');
        }

        var column0Row0 = left[0] * right[0] + left[1] * right[2];
        var column1Row0 = left[0] * right[1] + left[1] * right[3];
        var column0Row1 = left[2] * right[0] + left[3] * right[2];
        var column1Row1 = left[2] * right[1] + left[3] * right[3];

        if (typeof result === 'undefined') {
            return new Matrix2([column0Row0, column1Row0,
                                column0Row1, column1Row1]);
        }
        result[0] = column0Row0;
        result[1] = column1Row0;
        result[2] = column0Row1;
        result[3] = column1Row1;
        return result;
    }