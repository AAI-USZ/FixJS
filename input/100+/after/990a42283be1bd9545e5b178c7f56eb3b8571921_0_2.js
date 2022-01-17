function(t) {
    var useSnaps = opts.useSnaps;
    var v_prev;
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
    return [ pt[0], pt[1],
             pt[0] + (vel[0] * ptime),
             pt[1] + (vel[1] * ptime), ptime ];    
}