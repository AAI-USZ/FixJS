function(op, message, choices) {
        this._closeExistingDialog();
        this._dialog = new ShellMountQuestionDialog(this._gicon);

        this._dialogId = this._dialog.connect('response',
                               Lang.bind(this, function(object, choice) {
                                   this.mountOp.set_choice(choice);
                                   this.mountOp.reply(Gio.MountOperationResult.HANDLED);

                                   this.close();
                               }));

        this._dialog.update(message, choices);
        this._dialog.open();
    }