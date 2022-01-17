function(x,y,x2,y2) {
    var pattern=[1,2], count = pattern.length, ctx = this, compute = null,
        dx = (x2 - x), dy = (y2 - y), b = (Math.abs(dx) > Math.abs(dy)),
        slope = b ? dy / dx : dx / dy, sign = b ? (dx < 0 ?-1:1) : (dy < 0?-1:1);

    if (b) {
        compute = function(step) {
            x += step
            y += slope * step;
        }
    }
    else {
        compute = function(step) {
            x += slope * step;
            y += step;
        }
    }

    ctx.moveTo(x, y);
    var dist = Math.sqrt(dx * dx + dy * dy), i = 0;
    while (dist >= 0.1) {
        var dl = Math.min(dist, pattern[i % count]), step = Math.sqrt(dl * dl / (1 + slope * slope)) * sign;
        compute(step);
        ctx[(i % 2 == 0) ? 'lineTo' : 'moveTo'](x + 0.5, y + 0.5);
        dist -= dl;
        i++;
    }
    ctx.stroke();
}