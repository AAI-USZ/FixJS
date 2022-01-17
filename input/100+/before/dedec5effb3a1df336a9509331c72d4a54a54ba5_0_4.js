function (mat, vec, dest) {
        if (!dest) { dest = mat; }
        else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[4] = mat[4];
            dest[5] = mat[5];
        }
        var sx = vec[0], sy = vec[1];
        dest[0] = mat[0] * sx;
        dest[1] = mat[1] * sy;
        dest[2] = mat[2] * sx;
        dest[3] = mat[3] * sy;
        return dest;
    }