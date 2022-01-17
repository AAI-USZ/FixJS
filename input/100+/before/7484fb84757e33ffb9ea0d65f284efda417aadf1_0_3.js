function(b, pt) {
    // zero-bounds don't match
    if ((b[0] === b[1]) &&
        (b[1] === b[2]) &&
        (b[2] === b[3])/* &&
        (b[3] === b[0])*/) return false;
    return ((pt[0] >= b[0]) &&
            (pt[0] <= b[2]) &&
            (pt[1] >= b[1]) &&
            (pt[1] <= b[3]));
}