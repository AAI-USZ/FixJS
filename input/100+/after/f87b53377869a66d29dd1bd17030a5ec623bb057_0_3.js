function (cartesian, dest) {
        var x = cartesian[0],
            y = cartesian[1],
            z = cartesian[2],
            sphericalX;
        if (x === 0) {
            x = _epsilon;
        }
        if (!dest) {
            dest = vec3.create();
        }

        dest[0] = sphericalX = Math.sqrt(x * x + y * y + z * z);
        dest[1] = -atan(z / x);
        if (x < 0) {
            dest[1] += PI;
        }
        dest[2] = asin(y / sphericalX);
        return dest;
    }