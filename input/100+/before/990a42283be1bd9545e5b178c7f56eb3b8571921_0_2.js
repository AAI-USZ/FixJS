function(t, elm, func) {
    // NB: ensure t is _current_ time, not any other,
    //     many functions below rely on that fact
    var useSnaps = opts.useSnaps;
    var v_prev, v_next;
    var ptime = opts.predictSpan;
    if (!opts.useSnaps) {
        var s = this.state, _s = this._state;
        v_prev = [  s.x,  s.y, 
                   _s.x, _s.y,
                   t - s._appliedAt ];
    } else {
        // TODO: special func for getting just mov vect?
        v_prev = this._getVects(t)['mov'];
    }
    var vel = __velocity_of(v_prev),
        pt = [ v_prev[2], v_prev[3] ]; // start point
    v_next = [ pt[0], pt[1],
               pt[0] + (vel[0] * ptime),
               pt[1] + (vel[1] * ptime), ptime ];
    var apt0 = this.pradopt([ v_next[0], v_next[1] ]), // absolute point 0
        apt1 = this.pradopt([ v_next[2], v_next[3] ]); // absolute point 1
    var pts = opts.pathDriven ? this._pointsAt() : this.rect();
    for (var pi = 0, pl = pts.length; pi < pl; pi += 2) {
        var lpt0 = [ pts[pi], pts[pi+1] ];
        var lpt1 = ((pi + 2) != pl) 
                   ? [ pts[pi+2], pts[pi+3] ]
                   : [ pts[0], pts[1] ];
        if (this._vecEntresLine(apt0, apt1, 
                                lpt0, lpt1)) {
            func.call(this, t, elm);
            // save that we've tested collision
            return;
        }
    }
}