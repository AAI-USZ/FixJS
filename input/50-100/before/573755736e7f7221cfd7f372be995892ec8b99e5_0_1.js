function FtpConnection(properties) {
    events.EventEmitter.call(this);
    for (k in properties) { this[k] = properties[k]; }
}