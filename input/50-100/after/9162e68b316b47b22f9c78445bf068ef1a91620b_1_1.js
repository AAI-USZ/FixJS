function(r, pts) {
    if (G.__zeroRect(r)) return false;
    var inRect = G.__inRect;    
    for (var pi = 0, pl = pts.length; pi < pl; pi += 2) {
        if (inRect(r, [pts[pi], pts[pi+1]], false)) return true;
    }
    return false; // return count?    
}