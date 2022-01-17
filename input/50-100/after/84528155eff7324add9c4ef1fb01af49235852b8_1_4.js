function() {
    var x = this.xdata;
    if (x.__bounds) return x.__bounds;
    var bounds;
    if (x.path) {
        bounds = x.path.bounds();
    } else if (x.image) {
        bounds = [ 0, 0, x.image.width, x.image.height ];
    } else if (x.text) {
        bounds = x.text.bounds();
    } else return null;
    return bounds;
}