function(op, message) {
        this._notificationShowing = true;
        this._source = new ShellMountPasswordSource(message, this._gicon, this._reaskPassword);

        this._source.connect('password-ready',
                             Lang.bind(this, function(source, password) {
                                 this.mountOp.set_password(password);
                                 this.mountOp.reply(Gio.MountOperationResult.HANDLED);

                                 this._notificationShowing = false;
                                 this._source.destroy();
                             }));

        this._source.connect('destroy',
                             Lang.bind(this, function() {
                                 if (!this._notificationShowing)
                                     return;

                                 this._notificationShowing = false;
                                 this.mountOp.reply(Gio.MountOperationResult.ABORTED);
                             }));
    }