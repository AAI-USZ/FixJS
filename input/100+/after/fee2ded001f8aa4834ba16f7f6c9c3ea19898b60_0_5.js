function(t) {
    // may be called only on __mafter
    var s = this._state,
        s0 = s.snap0, s1 = s.snap1;
    if (!s0 && !s1) throw new Error('No vector data available, is this element tracked?');
    var pos = Math.floor(t / opts.vectorSpan);
    if (!s1) {
        if (pos != s0._at) throw new Error(E.__vecErrText);
        var vec_t = t - s0._at;
        return {
            'mov': [ s0.x, s0.y, s.x, s.y, vec_t ],
            'rot': [ s0.angle, s.angle, vec_t ],
            'scl': [ s0.sx, s0.sy, s.sx, s.sy, vec_t ]
        };
    } else {
        //if (pos != s1._at) throw new Error(E.__vecErrText);
        /*var eps = 0.05 * opts.vectorSpan; // epsilon
        if ((t > (pos - eps)) && (t < (pos + eps)) {
            var vec_t = s1._at - s0._at;
            return {
                'mov': [ s0.x, s0.y, s1.x, s1.y, vec_t ],
                'rot': [ s0.angle, s1.angle, vec_t ],
                'scl': [ s0.sx, s0.sy, s1.sx, s1.sy, vec_t ]
            };
        };*/
        var pass_t = t - s1._at;
        if (pass_t > opts.vectorSpan) { //throw new Error(E.__vecErrText);
            return {
                'mov': [ s1.x, s1.y, s.x, s.y, pass_t ],
                'rot': [ s1.angle, s.angle, pass_t ],
                'scl': [ s1.sx, s1.sy, s.x, s.y, pass_t ]
            };
        }
        var span_t = s1._at - s0._at;
        if (span_t < (opts.vectorSpan - pass_t)) throw new Error(E.__vecErrText);
        var span_pos = span_t - (opts.vectorSpan - pass_t); 
        // we take the approx. point between two states as
        // first point and current point as second to
        // make vector time equal to vector span
        var vec_t = opts.vectorSpan;
        // assert(opts.vectorSpan === (span_t - span_pos + pass_t))
        return {
            'mov': [ s0.x + ((s1.x - s0.x) * span_pos),
                     s0.y + ((s1.y - s0.y) * span_pos),
                     s1.x + ((s.x - s1.x) * pass_t),
                     s1.y + ((s.y - s1.y) * pass_t),
                     vec_t ],
            'rot': [ s0.angle + ((s1.angle - s0.angle) * span_pos),
                     s1.angle + ((s.x - s1.x) * pass_t),
                     s1.y + ((s.y - s1.y) * pass_t),
                     vec_t ],
            'scl': [ s0.sx + ((s1.sx - s0.sx) * span_pos),
                     s0.sy + ((s1.sy - s0.sy) * span_pos),
                     s1.sx + ((s.sx - s1.sx) * pass_t),
                     s1.sy + ((s.sy - s1.sy) * pass_t),
                     vec_t ]
        }
    }
    throw new Error(E.__vecErrText);
}