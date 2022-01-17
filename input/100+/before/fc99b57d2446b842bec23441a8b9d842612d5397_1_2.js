function(elm, t) {
    var x = this.xdata;
    if (x.__cfunc) return x.__cfunc.call(this, pt);
    if (G.__isecBounds(this.bounds(t), elm.bounds(t))) {
        if (!opts.pathCheck) return true;
        if (x.__cpath) return x.__cpath.contains(pt);
        throw new Error('Not implemented');
        /*if (x.path) return x.path.contains(pt);
        if (x.image) return G.__inBounds(this._cpa_bounds(), pt);
        if (x.text) throw new Error('Not implemented');*/
    }
}