function(mat, dest){
        if (!dest) { dest = mat; }
        var a = mat[0], b = mat[1], c = mat[2], d = mat[3],
            tx = mat[4], ty = mat[5];

        var det = a * d - b * c;
        if(!det) return null;

        det = 1.0 / det;
        dest[0] = d * det;
        dest[1] = -b * det;
        dest[2] = -c * det;
        dest[3] = a * det;
        dest[4] = (c * ty - d * tx) * det;
        dest[5] = -(a * ty - b * tx) * det;
        return dest;
    }