function(elm, t) {
    var in_bounds = G.__inBounds;
    var this_b = this.bounds(t);
    var other_b = elm.bounds(t);
    if (in_bounds(other_b, [this_b[0], this_b[1]])) return true; // x1, y1
    if (in_bounds(other_b, [this_b[2], this_b[1]])) return true; // x2, y1
    if (in_bounds(other_b, [this_b[2], this_b[3]])) return true; // x2, y2
    if (in_bounds(other_b, [this_b[0], this_b[3]])) return true; // x1, y2
    if (in_bounds(this_b, [other_b[0], other_b[1]])) return true; // x1, y1
    if (in_bounds(this_b, [other_b[2], other_b[1]])) return true; // x2, y1
    if (in_bounds(this_b, [other_b[2], other_b[3]])) return true; // x2, y2
    if (in_bounds(this_b, [other_b[0], other_b[3]])) return true; // x1, y2
    if (opts.pathCheck) throw new Error('Not implemented');
    return false;
}