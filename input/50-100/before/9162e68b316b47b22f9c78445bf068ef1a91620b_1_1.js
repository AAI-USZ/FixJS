function(b, pts) {
    if (G.__zeroBounds(b)) return false;
    var inBounds = G.__inBounds;    
    for (var pi = 0, pl = pts.length; pi < pl; pi += 2) {
        if (inBounds(b, [pts[pi], pts[pi+1]], false)) return true;
    }
    return false; // return count?    
}