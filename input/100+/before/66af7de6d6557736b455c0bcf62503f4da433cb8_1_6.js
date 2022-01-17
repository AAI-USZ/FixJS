function(op) {
        let processes = op.get_show_processes_pids();
        let choices = op.get_show_processes_choices();
        let message = op.get_show_processes_message();

        if (!this._processesDialog) {
            this._processesDialog = new ShellProcessesDialog(this._gicon);
            this._dialog = this._processesDialog;

            this._processesDialog.connect('response',
                                          Lang.bind(this, function(object, choice) {
                                              if (choice == -1) {
                                                  this.mountOp.reply(Gio.MountOperationResult.ABORTED);
                                              } else {
                                                  this.mountOp.set_choice(choice);
                                                  this.mountOp.reply(Gio.MountOperationResult.HANDLED);
                                              }

                                              this._processesDialog.close(global.get_current_time());
                                              this._dialog = null;
                                          }));
            this._processesDialog.open(global.get_current_time());
        }

        this._processesDialog.update(message, processes, choices);
    }