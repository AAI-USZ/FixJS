function(t) {
    var pos = Math.floor(t / opts.vectorSpan);
    var s = this.state, _s = this._state;
    if (!s._applied || !s.span0) {
        _s.snap0 = anm.obj_clone(_s); // FIXME: may be cloning is dangerous for arrays?
        _s.snap0._at = pos;
        _s.snap0._atT = t;
        // assert(pos === 0)
    } else if (s.snap0) {
        var offset0 = pos - s.snap0._at;
        if (!s.snap1 && (pos > 0)) {
            _s.snap1 = anm.obj_clone(_s);
            _s.snap1._at = pos;
            _s.snap1._atT = t;
            // assert(pos > 0)
        } else if ((offset > 1) && (pos != s.snap1._at)) {
            // assert(pos > 1)
            _s.snap0 = s.snap1;
            _s.snap1 = anm.obj_clone(_s);
            _s.snap1._at = pos;
            _s.snap1._atT = pos;
            // assert(offset > 0)
        } else {
            _s.snap0 = s.snap0;
            _s.snap1 = s.snap1;
            // assert(pos === s.snap1)
        }
    }
}