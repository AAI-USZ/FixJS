function() {
    this.__jumpLock = true;
    this.__lstate = obj_clone(this.state);
    this.__pstate = this._state ? obj_clone(this._state) : null;
}