function() {
    var result = this.state;
    this.state = this.__lstate;
    this.__lstate = null;
    this.__jumpLock = false;
    return result;
}