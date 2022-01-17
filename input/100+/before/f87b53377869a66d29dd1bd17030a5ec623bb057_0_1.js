function (vec, dest) {
        var x, y, len;
        if (!dest) { dest = vec; }

        x = vec[0];
        y = vec[1];
        len = sqrt(x * x + y * y);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            return dest;
        } else if (len === 1) {
            dest[0] = x;
            dest[1] = y;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        return dest;
    }