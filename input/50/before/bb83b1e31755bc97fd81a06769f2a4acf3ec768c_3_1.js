function (type, listener) {
    this.rch.addEventListener.apply(this, arguments);
    this.listeners.push( { type: type, listener: listener } );
}