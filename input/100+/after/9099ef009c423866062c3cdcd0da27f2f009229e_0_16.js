function(at) {
    var x = this.xdata,
        s = this.state;
    if (x.tf) return x.tf(at);
    var t = null,
        duration = x.lband[1] - x.lband[0];
    // if jump-time was set either
    // directly or relatively or with key,
    // get its absolute local value
    t = (s.p !== null) ? s.p : null;
    t = ((t === null) && (s.t !== null))
        ? s.t * duration
        : t;
    t = ((t === null) && (s.key !== null))
        ? x.keys[s.key]
        : t;
    if (t !== null) {
        if ((t < 0) || (t > duration)) {
            throw new Error('failed to calculate jump');
        }
        if (!this.__jumpLock) {
            // jump was performed if t or rt or key
            // were set:
            // save jump time and return it
            this.__lastJump = [ at, t ];
            s.p = null;
            s.t = null;
            s.key = null;
            return t;
        }
    }
    // set t to jump-time, and if no jump-time
    // was passed or it requires to be ignored,
    // just set it to actual local time
    t = (t !== null) ? t : at;
    if (this.__lastJump !== null) {
       // return (jump_pos + (t - jumped_at))
       return this.__lastJump[1] + (t - this.__lastJump[0]);
       /* // overflow will be checked in fits() method,
       // or recalculated with loop/bounce mode
       // so if this clip longs more than allowed,
       // it will be just ended there
       return ((this.__lastJump + t) > x.gband[1])
             ? (this.__lastJump + t)
             : x.gband[1]; */
    }
    return t;
}