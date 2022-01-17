function(pt, t) {
    if (!pt) return false;
    var b = this._cpa_bounds();
    if (!b) return false;
    var pt = this._padopt(pt, t);
    var x = this.xdata;
    if (x.__cfunc) return x.__cfunc.call(this, pt);
    if (G.__inBounds(b, pt)) {
        if (!opts.pathCheck) return true;
        if (x.__cpath) return x.__cpath.contains(pt);        
        if (x.path) return x.path.contains(pt);
        if (x.image) return G.__inBounds(this._cpa_bounds(), pt);
        if (x.text) throw new Error('Not implemented');
    } 
    return false;
}