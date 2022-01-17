function (code, callbacks) {
        if (callbacks == undefined) {
            var callbacks = {
                'execute_reply': $.proxy(this._handle_execute_reply, this),
                'output': $.proxy(this.handle_output),
            };
        }
        var msg_id = this.notebook.kernel.execute(code, callbacks); //TODO: need to add callbacks
        return msg_id
    }