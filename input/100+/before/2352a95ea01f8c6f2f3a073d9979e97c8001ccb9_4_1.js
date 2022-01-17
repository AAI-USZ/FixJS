function(scale) {
        if (scale) {
            return new Matrix3(
                    scale, 0.0,   0.0,
                    0.0,   scale, 0.0,
                    0.0,   0.0,   scale);
        }

        return new Matrix3();
    }