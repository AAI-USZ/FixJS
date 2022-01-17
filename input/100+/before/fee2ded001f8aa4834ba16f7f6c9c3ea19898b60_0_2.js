function(t, elm, func) {
    // NB: ensure t is _current_ time, not any other,
    //     many functions below rely on that fact
    var v_next = this._getNextVect(t);
    this.__nvec = v_next;
    var apt0 = this._pradopt([ v_next[0], v_next[1] ]), // absolute point 0
        apt1 = this._pradopt([ v_next[2], v_next[3] ]); // absolute point 1
    var pts = opts.pathDriven ? elm._pointsAt() : elm.rect();
    for (var pi = 0, pl = pts.length; pi < pl; pi += 2) {
        var lpt0 = [ pts[pi], pts[pi+1] ];
        var lpt1 = ((pi + 2) != pl) 
                   ? [ pts[pi+2], pts[pi+3] ]
                   : [ pts[0], pts[1] ];
        if (this._vecEntersLine(apt0, apt1, 
                                lpt0, lpt1)) {
            func.call(this, t, elm);
            // save that we've tested collision
            return;
        }
    }

}