function(left, right, bottom, top, zNear, zFar) {
        var a = 1.0 / (right - left);
        var b = 1.0 / (top - bottom);
        var c = 1.0 / (zFar - zNear);

        var tx = -(right + left) * a;
        var ty = -(top + bottom) * b;
        var tz = -(zFar + zNear) * c;

        return new Matrix4(2.0 * a, 0.0, 0.0, tx,
                           0.0, 2.0 * b, 0.0, ty,
                           0.0, 0.0, -2.0 * c, tz,
                           0.0, 0.0, 0.0, 1.0);
    }