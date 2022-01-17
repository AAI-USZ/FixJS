function (pos) {
        if (n === undefined) {
            n = s = pos[0];
            w = e = pos[1];
        }
        n = Math.max(pos[0], n);
        s = Math.min(pos[0], s);
        w = Math.min(pos[1], w);
        e = Math.max(pos[1], e);
        return [[s, w], [n, e]];
    }