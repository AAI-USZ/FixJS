function(t) {
    // NB: ensure t is _current_ time, not any other,
    //     many functions below rely on that fact
    var s0, s1,
        t_diff;
    var t_pred = opts.predictSpan;

    // get first and second state to calculate
    // vector from. s0 will hold first state,
    // s1 — second, t_diff — time difference between them
    if (!opts.useSnaps) {
        s0 = this.state;
        s1 = this._state;
        t_diff = t - s0._appliedAt;
    } else {
        var s = this._state,
            sn0 = s.snap0, sn1 = s.snap1;
        if (!sn0 && !sn1) throw new Error('No vector data available, is this element tracked?');
        var pos = Math.floor(t / opts.vectorSpan);
        if (!sn1) {
            if (pos != sn0._at) throw new Error(E.__vecErrText);
            s0 = sn0; s1 = s;
            t_diff = t - sn0._atT;
        } else {
            var pass_t = t - sn1._atT;
            if (pass_t <= opts.vectorSpan) {
                var span_t = sn1._atT - sn0._atT;
                if (span_t < (opts.vectorSpan - pass_t)) throw new Error(E.__vecErrText);
                var span_pos = span_t - (opts.vectorSpan - pass_t);
                s0 = E._stateBetween(sn0, sn1, span_t, span_pos); s1 = s;
                t_diff = opts.vectorSpan;
            } else {
                s0 = sn1; s1 = s;
                t_diff = pass_t;                
            }
        }
    }

    var vec = E._getVect(s0, s1 || s0, t_diff);
    var ghost = E._predictState(s1 || s0, vec, opts.predictSpan);
    ghost._matrix = E._getMatrixOf(ghost, ghost._matrix);
    ghost._vec = vec;
    ghost._tdiff = t_diff;

    this.__ghost_m = ghost._matrix;
    this.__ghost_v = ghost._vec

    return ghost;
}