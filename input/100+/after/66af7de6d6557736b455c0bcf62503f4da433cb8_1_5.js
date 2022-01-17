function(object, choice) {
                                   this.mountOp.set_choice(choice);
                                   this.mountOp.reply(Gio.MountOperationResult.HANDLED);

                                   this.close();
                               }