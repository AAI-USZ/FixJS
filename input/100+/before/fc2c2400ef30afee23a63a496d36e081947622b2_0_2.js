function (code) {
    if (this.opened) {
        var callbacks = {"output": $.proxy(this.handle_output, this)};
        this.set_last_request(null, this.kernel.execute(code, callbacks, {"silent": false}));
    } else {
        this.deferred_code.push(code);
    }
}