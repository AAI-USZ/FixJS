function (type, listener) {
    this.rch.addEventListener.call(this, type, listener);
    this.listeners.push( { type: type, listener: listener } );
}