function() {
    var x = this.xdata;
    if (x.__cpath) return x.__cpath.getPoints();
    if (x.path) return x.path.getPoints();
    if (x.image || x.text) return this.ibounds();
}