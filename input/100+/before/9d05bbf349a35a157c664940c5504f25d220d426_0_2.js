function(s1, vec, t_pred) {
    return {
        'x': s1.x + vec.x * t_pred,
        'y': s1.y + vec.y * t_pred,
        'lx': s1.lx + vec.lx * t_pred,
        'ly': s1.ly + vec.ly * t_pred,
        'rx': s1.rx + vec.rx * t_pred,
        'ry': s1.ry + vec.ry * t_pred,
        'sx': s1.rx + vec.sx * t_pred,
        'sy': s1.ry + vec.sy * t_pred,
        'angle': s1.angle + vec.angle * t_pred,
        'alpha': s1.alpha + vec.alpha * t_pred
    }
}