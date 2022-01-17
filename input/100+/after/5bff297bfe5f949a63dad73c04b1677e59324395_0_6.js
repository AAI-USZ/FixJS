function(left, right, bottom, top, zNear, result) {
        if (typeof left === 'undefined') {
            throw new DeveloperError('left is required.');
        }
        if (typeof right === 'undefined') {
            throw new DeveloperError('right is required.');
        }
        if (typeof bottom === 'undefined') {
            throw new DeveloperError('bottom is required.');
        }
        if (typeof top === 'undefined') {
            throw new DeveloperError('top is required.');
        }
        if (typeof zNear === 'undefined') {
            throw new DeveloperError('zNear is required.');
        }

        var column0Row0 = 2.0 * zNear / (right - left);
        var column1Row1 = 2.0 * zNear / (top - bottom);
        var column2Row0 = (right + left) / (right - left);
        var column2Row1 = (top + bottom) / (top - bottom);
        var column2Row2 = -1.0;
        var column2Row3 = -1.0;
        var column3Row2 = -2.0 * zNear;

        if (typeof result === 'undefined') {
            return new Matrix4(column0Row0, 0.0,         column2Row0, 0.0,
                                       0.0, column1Row1, column2Row1, 0.0,
                                       0.0, 0.0,         column2Row2, column3Row2,
                                       0.0, 0.0,         column2Row3, 0.0);
        }

        result[0] = column0Row0;
        result[1] = 0.0;
        result[2] = 0.0;
        result[3] = 0.0;
        result[4] = 0.0;
        result[5] = column1Row1;
        result[6] = 0.0;
        result[7] = 0.0;
        result[8] = column2Row0;
        result[9] = column2Row1;
        result[10] = column2Row2;
        result[11] = column2Row3;
        result[12] = 0.0;
        result[13] = 0.0;
        result[14] = column3Row2;
        result[15] = 0.0;
        return result;
    }