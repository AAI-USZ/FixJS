function (matA, matB, dest) {
        if (!dest) { dest = matA; }

        var a = matA[0], b = matA[1], c = matA[2], d = matA[3],
            tx = matA[4], ty = matA[5],
            a2 = matB[0], b2 = matB[1], c2 = matB[2], d2 = matB[3],
            tx2 = matB[4], ty2 = matB[5];

        dest[0] = a*a2 + b*c2;
        dest[1] = a*b2 + b*d2;
        dest[2] = c*a2 + d*c2;
        dest[3] = c*b2 + d*d2;
        dest[4] = a2*tx + c2*ty + tx2;
        dest[5] = b2*tx + d2*ty + ty2;

        return dest;
    }