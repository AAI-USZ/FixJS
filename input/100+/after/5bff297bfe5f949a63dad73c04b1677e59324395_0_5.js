function(viewport, nearDepthRange, farDepthRange, result) {
        var v = viewport || {};
        v.x = v.x || 0.0;
        v.y = v.y || 0.0;
        v.width = v.width || 0.0;
        v.height = v.height || 0.0;
        nearDepthRange = nearDepthRange || 0.0;
        farDepthRange = (typeof farDepthRange === 'undefined') ? 1.0 : farDepthRange;

        var halfWidth = v.width * 0.5;
        var halfHeight = v.height * 0.5;
        var halfDepth = (farDepthRange - nearDepthRange) * 0.5;

        var column0Row0 = halfWidth;
        var column1Row1 = halfHeight;
        var column2Row2 = halfDepth;
        var column3Row0 = v.x + halfWidth;
        var column3Row1 = v.y + halfHeight;
        var column3Row2 = nearDepthRange + halfDepth;
        var column3Row3 = 1.0;

        if (typeof result === 'undefined') {
            return new Matrix4(column0Row0, 0.0,         0.0,         column3Row0,
                               0.0,         column1Row1, 0.0,         column3Row1,
                               0.0,         0.0,         column2Row2, column3Row2,
                               0.0,         0.0,         0.0,         column3Row3);
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
        result[11] = 0.0;
        result[12] = column3Row0;
        result[13] = column3Row1;
        result[14] = column3Row2;
        result[15] = column3Row3;
        return result;
    }