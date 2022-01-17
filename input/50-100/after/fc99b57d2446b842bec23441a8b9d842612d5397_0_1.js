function(pt, rect) {
    var rect = Array.isArray(rect) ? rect 
                                   : [ rect, rect ]; 
    var w = rect[0], h = rect[1];
    this.path([[0, 0], [w, 0],
               [w, h], [0, h],
               [0, 0]], pt);
    return this;
}