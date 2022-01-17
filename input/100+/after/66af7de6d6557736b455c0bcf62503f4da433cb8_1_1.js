function(source, params) {
        params = Params.parse(params, { existingDialog: null });

        this._dialog = null;
        this._dialogId = 0;
        this._existingDialog = params.existingDialog;
        this._processesDialog = null;

        this.mountOp = new Shell.MountOperation();

        this.mountOp.connect('ask-question',
                             Lang.bind(this, this._onAskQuestion));
        this.mountOp.connect('ask-password',
                             Lang.bind(this, this._onAskPassword));
        this.mountOp.connect('show-processes-2',
                             Lang.bind(this, this._onShowProcesses2));
        this.mountOp.connect('aborted',
                             Lang.bind(this, this.close));

        this._gicon = source.get_icon();
    }