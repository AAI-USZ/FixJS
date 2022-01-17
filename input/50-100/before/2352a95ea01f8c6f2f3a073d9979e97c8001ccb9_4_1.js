function(theta) {
        var c = Math.cos(theta);
        var s = Math.sin(theta);
        return new Matrix3(
                  c, 0.0,   s,
                0.0, 1.0, 0.0,
                 -s, 0.0,   c);
    }