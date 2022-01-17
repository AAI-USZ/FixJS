function (mat, mat2, dest) {
        if (!dest) { dest = mat; }

        var a = mat[0], b = mat[1], c = mat[2], d = mat[3],
            tx = mat[4], ty = mat[5],
            a2 = mat2[0], b2 = mat2[1], c2 = mat2[2], d2 = mat2[3],
            tx2 = mat2[4], ty2 = mat2[5];

        dest[0] = a2 * a + c2 * b;
        dest[1] = b2 * a + d2 * b;
        dest[2] = a2 * c + c2 * d;
        dest[3] = b2 * c + d2 * d;
        dest[4] = tx + tx2 * a + ty2 * b;
        dest[5] = ty + tx2 * c + ty2 * d;

        return dest;
    }