function(object, choice) {
                                              if (choice == -1) {
                                                  this.mountOp.reply(Gio.MountOperationResult.ABORTED);
                                              } else {
                                                  this.mountOp.set_choice(choice);
                                                  this.mountOp.reply(Gio.MountOperationResult.HANDLED);
                                              }

                                              this._processesDialog.close(global.get_current_time());
                                              this._dialog = null;
                                          }