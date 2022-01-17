function(fovy, aspect, zNear, zFar, result) {
        if (fovy <= 0.0 || fovy > Math.PI) {
            throw new DeveloperError('fovy must be in [0, PI).');
        }

        if (aspect <= 0.0) {
            throw new DeveloperError('aspect must be greater than zero.');
        }

        if (zNear <= 0.0) {
            throw new DeveloperError('zNear must be greater than zero.');
        }

        if (zFar <= 0.0) {
            throw new DeveloperError('zFar must be greater than zero.');
        }

        var bottom = Math.tan(fovy * 0.5);

        var column1Row1 = 1.0 / bottom;
        var column0Row0 = column1Row1 / aspect;
        var column2Row2 = (zFar + zNear) / (zNear - zFar);
        var column3Row2 = (2.0 * zFar * zNear) / (zNear - zFar);

        if (typeof result === 'undefined') {
            return new Matrix4(column0Row0, 0.0,         0.0,         0.0,
                               0.0,         column1Row1, 0.0,         0.0,
                               0.0,         0.0,         column2Row2, column3Row2,
                               0.0,         0.0,        -1.0,         0.0);
        }

        result[0] = column0Row0;
        result[1] = 0.0;
        result[2] = 0.0;
        result[3] = 0.0;
        result[4] = 0.0;
        result[5] = column1Row1;
        result[6] = 0.0;
        result[7] = 0.0;
        result[8] = 0.0;
        result[9] = 0.0;
        result[10] = column2Row2;
        result[11] = -1.0;
        result[12] = 0.0;
        result[13] = 0.0;
        result[14] = column3Row2;
        result[15] = 0.0;
        return result;
    }