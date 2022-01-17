function(pt, t) {
    if (!pt) return false;
    var b = this._cpa_bounds();
    if (!b) return false;
    var pt = this._padopt(pt, t);
    if (this.__cfunc) return this.__cfunc.call(this, pt);
    if (G.__inBounds(b, pt)) {
        if (!opts.pathCheck) return true;
        if (this.__cpath) return this.__cpath.contains(pt);
        var x = this.xdata;
        if (x.path) return x.path.contains(pt);
        if (x.image) return G.__inBounds(this._cpa_bounds(), pt);
        if (x.text) throw new Error('Not implemented');
    } 
    return false;
}