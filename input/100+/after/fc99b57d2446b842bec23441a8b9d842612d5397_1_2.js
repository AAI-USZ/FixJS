function(elm, t) {
    var boundsMatched;
    if (boundsMatched = 
        G.__isecBounds(this.bounds(t), elm.bounds(t))) {
        if (!opts.pathCheck) return true;
        var cx = this.xdata, ex = elm.xdata;
        var cIsPath = (cx.__cpath || cx.path);
        var eIsPath = (ex.__cpath || ex.path);
        if (!cIsPath && !eIsPath) return boundsMatched;
        else if (cIsPath && eIsPath) {
            return G.__pointsInPath(cx.__cpath || cx.path, 
                                    elm._pradopt(elm.collectPoints(), t)) ||
                   G.__pointsInPath(ex.__cpath || ex.path,
                                    this._pradopt(this.collectPoints(), t));
        } else if (cIsPath && !eIsPath) {
            var epts = elm._pradopt(elm.ibounds(), t);
            return G.__pointsInPath(cx.__cpath || cx.path, epts) ||
                   G.__pointsInBounds(this._pradopt(this.collectPoints(), t), epts);
        } else if (!cIsPath && eIsPath) {
            var cpts = this._pradopt(this.ibounds(), t);
            return G.__pointsInPath(ex.__cpath || ex.path, cpts) ||
                   G.__pointsInBounds(elm._pradopt(elm.collectPoints(), t), cpts);
        }
        return false;
    }
}