function (quat, dest) {
        var x = quat[0], y = quat[1], z = quat[2],
            w = -sqrt(abs(1.0 - x * x - y * y - z * z));

        if (!dest || quat === dest) {
            quat[3] = w;
            return quat;
        }
        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = w;
        return dest;
    }