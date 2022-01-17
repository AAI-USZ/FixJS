function(matrix) {
        var x = 0;
        var y = 0;
        var z = 0;
        var w = 0;

        var m00 = matrix.getColumn0Row0();
        var m11 = matrix.getColumn1Row1();
        var m22 = matrix.getColumn2Row2();

        var factor = m00 * m11 * m22;

        var type = 0;
        if (m00 > factor) {
            type = 1;
            factor = m00;
        }

        if (m11 > factor) {
            type = 2;
            factor = m11;
        }

        if (m22 > factor) {
            type = 3;
            factor = m22;
        }

        if (type === 1) {
            x = 0.5 * Math.sqrt(1.0 + m00 - m11 - m22);
            factor = 1.0 / (4.0 * x);

            w = factor * (matrix.getColumn2Row1() - matrix.getColumn1Row2());

            if (w < 0.0) {
                w = -w;
                factor = -factor;
            }

            y = factor * (matrix.getColumn1Row0() + matrix.getColumn0Row1());
            z = factor * (matrix.getColumn2Row0() + matrix.getColumn0Row2());
        } else if (type === 2) {
            y = 0.5 * Math.sqrt(1.0 - m00 + m11 - m22);
            factor = 1.0 / (4.0 * y);

            w = factor * (matrix.getColumn0Row2() - matrix.getColumn2Row0());

            if (w < 0) {
                w = -w;
                factor = -factor;
            }

            x = factor * (matrix.getColumn1Row0() + matrix.getColumn0Row1());
            z = factor * (matrix.getColumn2Row1() + matrix.getColumn1Row2());
        } else if (type === 3) {
            z = 0.5 * Math.sqrt(1.0 - m00 - m11 + m22);
            factor = 1.0 / (4.0 * z);

            w = factor * (matrix.getColumn1Row0() - matrix.getColumn0Row1());

            if (w < 0) {
                w = -w;
                factor = -factor;
            }

            x = factor * (matrix.getColumn2Row0() + matrix.getColumn0Row2());
            y = factor * (matrix.getColumn2Row1() + matrix.getColumn1Row2());
        } else {
            w = 0.5 * Math.sqrt(1.0 + factor);
            factor = 1.0 / (4.0 * w);

            x = factor * (matrix.getColumn2Row1() - matrix.getColumn1Row2());
            y = factor * (matrix.getColumn0Row2() - matrix.getColumn2Row0());
            z = factor * (matrix.getColumn1Row0() - matrix.getColumn0Row1());
        }

        return new Quaternion(x, y, z, w);
    }