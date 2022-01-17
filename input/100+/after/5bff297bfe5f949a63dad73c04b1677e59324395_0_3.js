function(eye, target, up, result) {
        if (typeof eye === 'undefined') {
            throw new DeveloperError('eye is required.');
        }
        if (typeof target === 'undefined') {
            throw new DeveloperError('target is required.');
        }
        if (typeof up === 'undefined') {
            throw new DeveloperError('up is required.');
        }

        var f = Cartesian3.subtract(target, eye).normalize();
        var s = f.cross(up).normalize();
        var u = s.cross(f).normalize();

        var rotation = new Matrix4(
            s.x,  s.y,  s.z, 0.0,
            u.x,  u.y,  u.z, 0.0,
           -f.x, -f.y, -f.z, 0.0,
            0.0,  0.0,  0.0, 1.0);

        var translation = new Matrix4(
            1.0, 0.0, 0.0, -eye.x,
            0.0, 1.0, 0.0, -eye.y,
            0.0, 0.0, 1.0, -eye.z,
            0.0, 0.0, 0.0, 1.0);

        return rotation.multiply(translation, result);
    }