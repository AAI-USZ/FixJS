function (mat, vec, dest) {
        if (!dest) { dest = mat; }
        else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
        }
        var x = vec[0], y = vec[1];
        dest[4] = x + mat[4];
        dest[5] = y + mat[5];
        return dest;
    }