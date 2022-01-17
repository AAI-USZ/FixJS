function(object, choice, password, remember) {
                if (choice == '-1') {
                    this.mountOp.reply(Gio.MountOperationResult.ABORTED);
                } else {
                    if (remember)
                        this.mountOp.set_password_save(Gio.PasswordSave.PERMANENTLY);
                    else
                        this.mountOp.set_password_save(Gio.PasswordSave.NEVER);

                    this.mountOp.set_password(password);
                    this.mountOp.reply(Gio.MountOperationResult.HANDLED);
                }

                this._dialog.close(global.get_current_time());
                this._dialog = null;
            }