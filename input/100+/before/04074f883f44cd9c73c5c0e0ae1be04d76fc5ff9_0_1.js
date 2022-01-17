function(readyCallback) {
        if (!IBus)
            return;

        IBus.init();

        this._readyCallback = readyCallback;

        this._ibus = null;
        this._engines = {};
        this._ready = false;

        this._nameWatcherId = Gio.DBus.session.watch_name(IBus.SERVICE_IBUS,
                                                          Gio.BusNameWatcherFlags.NONE,
                                                          Lang.bind(this, this._onNameAppeared),
                                                          Lang.bind(this, this._clear));
    }