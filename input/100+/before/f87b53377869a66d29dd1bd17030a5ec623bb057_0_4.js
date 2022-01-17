function (mat, dest) {
        // Code based on http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        var m00 = mat[0], m10 = mat[1], m20 = mat[2],
            m01 = mat[3], m11 = mat[4], m21 = mat[5],
            m02 = mat[6], m12 = mat[7], m22 = mat[8],
            trace = m00 + m11 + m22,  // trace of matrix
            s;

        if (!dest) {
            dest = quat4.create();
        }
        if (trace > 0) {
            s = 0.5 / sqrt(trace + 1.0);
            dest[0] = (m21 - m12) * s;
            dest[1] = (m02 - m20) * s;
            dest[2] = (m10 - m01) * s;
            dest[3] = 0.25 / s;
        } else {
            if (m00 > m11 && m00 > m22) {
                s = 2.0 * sqrt(1.0 + m00 - m11 - m22);
                dest[0] = 0.25 * s;
                dest[1] = (m01 + m10) / s;
                dest[2] = (m02 + m20) / s;
                dest[3] = (m21 - m12) / s;
            } else if (m11 > m22) {
                s = 2.0 * sqrt(1.0 + m11 - m00 - m22);
                dest[0] = (m01 + m10) / s;
                dest[1] = 0.25 * s;
                dest[2] = (m12 + m21) / s;
                dest[3] = (m02 - m20) / s;
            } else {
                s = 2.0 * sqrt(1.0 + m22 - m00 - m11);
                dest[0] = (m02 + m20) / s;
                dest[1] = (m12 + m21) / s;
                dest[2] = 0.25 * s;
                dest[3] = (m10 - m01) / s;
            }
        }
        return dest;
    }