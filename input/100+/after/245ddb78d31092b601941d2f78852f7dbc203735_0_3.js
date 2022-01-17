function(s0, s1, t_diff, at) {
    if (t_diff == 0) return s0;
    return {
        'x': s0.x + ((s1.x - s0.x) / t_diff) * at,
        'y': s0.y + ((s1.y - s0.y) / t_diff) * at,
        'lx': s0.lx + ((s1.lx - s0.lx) / t_diff) * at,
        'ly': s0.lx + ((s1.ly - s0.ly) / t_diff) * at,
        'rx': s0.rx + ((s1.rx - s0.rx) / t_diff) * at,
        'ry': s0.ry + ((s1.ry - s0.ry) / t_diff) * at,
        'sx': s0.sx + ((s1.sx - s0.sx) / t_diff) * at,
        'sy': s0.sy + ((s1.sy - s0.sy) / t_diff) * at,
        'angle': s0.angle + ((s1.angle - s0.angle) / t_diff) * at,
        'alpha': s0.alpha + ((s1.alpha - s0.alpha) / t_diff) * at
    }
}