function(s0, s1, t_diff) {
    if (t_diff == 0) return E.createState();
    return {
        'x': (s1.x - s0.x) / t_diff,
        'y': (s1.y - s0.y) / t_diff,
        'lx': (s1.lx - s0.lx) / t_diff,
        'ly': (s1.ly - s0.ly) / t_diff,
        'rx': (s1.rx - s0.rx) / t_diff,
        'ry': (s1.ry - s0.ry) / t_diff,
        'sx': (s1.sx - s0.sx) / t_diff,
        'sy': (s1.sy - s0.sy) / t_diff,
        'angle': (s1.angle - s0.angle) / t_diff,
        'alpha': (s1.alpha - s0.alpha) / t_diff
    }
}