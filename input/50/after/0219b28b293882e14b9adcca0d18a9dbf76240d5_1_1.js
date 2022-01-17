function (p, n) {
        posn = positions[n];
        if (posn &&
            posn.enableSelect !== false &&
            posn.enableDisplay !== false
        ) {
            selection[n] = p;
        }
    }