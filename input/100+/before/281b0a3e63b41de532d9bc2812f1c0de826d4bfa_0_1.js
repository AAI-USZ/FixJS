function(source, params) {
        params = Params.parse(params, { reaskPassword: false });

        this._reaskPassword = params.reaskPassword;

        this._dialog = null;
        this._processesDialog = null;

        this.mountOp = new Shell.MountOperation();

        this.mountOp.connect('ask-question',
                             Lang.bind(this, this._onAskQuestion));
        this.mountOp.connect('ask-password',
                             Lang.bind(this, this._onAskPassword));
        this.mountOp.connect('show-processes-2',
                             Lang.bind(this, this._onShowProcesses2));
        this.mountOp.connect('aborted',
                             Lang.bind(this, this._onAborted));

        this._icon = new St.Icon({ gicon: source.get_icon(),
                                   style_class: 'shell-mount-operation-icon' });
    }