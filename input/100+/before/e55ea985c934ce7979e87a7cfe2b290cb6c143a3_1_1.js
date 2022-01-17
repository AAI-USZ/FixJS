function(order, ltime) {
    // save the previous state
    this.state._ = null; // clear the pointer, so it will not be cloned
    this._state = obj_clone(this.state);
    this._state._ = this.state;

    // now it looks like:
    // this.
    //     .state -> state from the last modifiers call
    //     ._state -> clone of the last state, it is passed to modifiers as `this`
    //     ._state._ -> a pointer to the last state, so it will be accessible in
    //                  modifiers as `this._`

    this.__loadEvts(this._state);

    var modifiers = this._modifiers;
    var type, seq, cur;
    for (var typenum = 0, last = order.length;
         typenum < last; typenum++) {
        type = order[typenum];    
        seq = modifiers[type];
        this.__modifying = type;
        this.__mbefore(type);      
        if (seq) {
          for (var pi = 0, pl = seq.length; pi < pl; pi++) { // by priority
            if (cur = seq[pi]) {
              for (var ci = 0, cl = cur.length; ci < cl; ci++) {
                if (cur[ci] && (cur[ci][0].call(this._state, ltime, cur[ci][1]) === false)) {
                  this.__mafter(ltime, type, false);
                  this.__modifying = null;
                  this.__clearEvts(this._state);
                  // NB: nothing happens to the state or element here,
                  //     the modified things are not applied
                  return false;
                }
              }
            }
          }
        }
        this.__mafter(ltime, type, true);
    }
    this.__modifying = null;
    this._state._applied = true;
    this._state._appliedAt = ltime;

    this.__clearEvts(this._state);

    // save modified state as last
    this.state = this._state;
    this._state = null;
    this.state._ = null;

    // apply last state
    return true;
}