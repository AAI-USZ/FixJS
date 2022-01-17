function() {
        var result, dx, i, imax;
        result = new Float32Array(128 * 8192);
        dx     = Math.pow(2, (1 / (12 * 8192)));
        for (i = 0, imax = result.length; i < imax; ++i) {
            result[i] = 440 * Math.pow(dx, i - (69 * 8192));
        }
        return result;
    }