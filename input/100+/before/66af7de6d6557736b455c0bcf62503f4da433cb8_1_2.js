function(object, choice) {
                                   this.mountOp.set_choice(choice);
                                   this.mountOp.reply(Gio.MountOperationResult.HANDLED);

                                   this._dialog.close(global.get_current_time());
                                   this._dialog = null;
                               }