function(op, message, choices) {
        this._dialog = new ShellMountQuestionDialog(this._gicon);

        this._dialog.connect('response',
                               Lang.bind(this, function(object, choice) {
                                   this.mountOp.set_choice(choice);
                                   this.mountOp.reply(Gio.MountOperationResult.HANDLED);

                                   this._dialog.close(global.get_current_time());
                                   this._dialog = null;
                               }));

        this._dialog.update(message, choices);
        this._dialog.open(global.get_current_time());
    }