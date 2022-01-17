function(pt, t) {
    if (!pt) return false;
    var b = this._cpa_bounds();
    if (!b) return false;
    var pt = this._padopt(pt, t);
    var x = this.xdata;
    if (x.__cfunc) return x.__cfunc.call(this, pt);
    var inBounds;
    if (inBounds = G.__inBounds(b, pt)) {
        if (!opts.pathDriven) return true;
        if (x.__cpath) return x.__cpath.contains(pt);        
        if (x.path) return x.path.contains(pt);
        if (x.image || x.text) return inBounds;
    } 
    return false;
}