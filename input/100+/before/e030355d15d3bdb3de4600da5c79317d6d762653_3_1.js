function(c) {
    var c_;
    c_ = {
      p: c.p
    };
    if (c.si !== void 0) c_.sd = c.si;
    if (c.sd !== void 0) c_.si = c.sd;
    if (c.oi !== void 0) c_.od = c.oi;
    if (c.od !== void 0) c_.oi = c.od;
    if (c.li !== void 0) c_.ld = c.li;
    if (c.ld !== void 0) c_.li = c.ld;
    if (c.na !== void 0) c_.na = -c.na;
    if (c.lm !== void 0) {
      c_.lm = c.p[c.p.length - 1];
      c_.p = c.p.slice(0, (c.p.length - 1)).concat([c.lm]);
    }
    return c_;
  }