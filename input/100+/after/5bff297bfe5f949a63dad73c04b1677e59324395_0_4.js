function(left, right, bottom, top, zNear, zFar, result) {
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
        if (typeof zFar === 'undefined') {
            throw new DeveloperError('zFar is required.');
        }

        var a = 1.0 / (right - left);
        var b = 1.0 / (top - bottom);
        var c = 1.0 / (zFar - zNear);

        var tx = -(right + left) * a;
        var ty = -(top + bottom) * b;
        var tz = -(zFar + zNear) * c;
        a *= 2.0;
        b *= 2.0;
        c *= -2.0;

        if (typeof result === 'undefined') {
            return new Matrix4(  a, 0.0, 0.0, tx,
                               0.0,   b, 0.0, ty,
                               0.0, 0.0,   c, tz,
                               0.0, 0.0, 0.0, 1.0);
        }

        result[0] = a;
        result[1] = 0.0;
        result[2] = 0.0;
        result[3] = 0.0;
        result[4] = 0.0;
        result[5] = b;
        result[6] = 0.0;
        result[7] = 0.0;
        result[8] = 0.0;
        result[9] = 0.0;
        result[10] = c;
        result[11] = 0.0;
        result[12] = tx;
        result[13] = ty;
        result[14] = tz;
        result[15] = 1.0;
        return result;
    }