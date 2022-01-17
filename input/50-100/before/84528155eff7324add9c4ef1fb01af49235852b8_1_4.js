function() {
    var x = this.xdata;
    var bounds;
    if (x.path) {
        bounds = x.path.bounds();
    } else if (x.image) {
        bounds = [ 0, 0, x.image.width, x.image.height ];
    } else if (x.text) {
        bound = x.text.bounds();
    } else return null;
    return bounds;
}