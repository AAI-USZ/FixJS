function() {
    var points = [];
    this.visit(function(seg) {
       points.concat(seg.pts);
    });
    return points;
}