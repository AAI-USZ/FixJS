function(onRender, window) {
    this.onRender = onRender;
    this.pending = false;
    this.changes = 0;
    this.setTimeoutZero = this.setTimeoutZero.bind(window);
}