function(b1, b2) {
    var inBounds = G.__inBounds;
    if (!b1 || !b2) throw new Error('Bounds are not accessible');
    if (G.__zeroBounds(b1) || G.__zeroBounds(b2)) return false;
    if (inBounds(b2, [b1[0], b1[1]])) return true; // x1, y1
    if (inBounds(b2, [b1[2], b1[1]])) return true; // x2, y1
    if (inBounds(b2, [b1[2], b1[3]])) return true; // x2, y2
    if (inBounds(b2, [b1[0], b1[3]])) return true; // x1, y2
    if (inBounds(b1, [b2[0], b2[1]])) return true; // x1, y1
    if (inBounds(b1, [b2[2], b2[1]])) return true; // x2, y1
    if (inBounds(b1, [b2[2], b2[3]])) return true; // x2, y2
    if (inBounds(b1, [b2[0], b2[3]])) return true; // x1, y2
    return false; 
}