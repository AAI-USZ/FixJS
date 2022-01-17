function(pos) {
        if (n == null) n = (s != null ? s : s = pos[0]);
        if (w == null) w = (e != null ? e : e = pos[1]);
        n = Math.max(pos[0], n);
        s = Math.min(pos[0], s);
        w = Math.min(pos[1], w);
        e = Math.max(pos[1], e);
        return [[s, w], [n, e]];
      }