function(fovy, aspect, zNear, zFar) {
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
        var f = 1.0 / bottom;

        return new Matrix4(f / aspect, 0.0, 0.0, 0.0,
                           0.0, f, 0.0, 0.0, 0.0,
                           0.0, (zFar + zNear) / (zNear - zFar), (2.0 * zFar * zNear) / (zNear - zFar),
                           0.0, 0.0, -1.0, 0.0);
    }