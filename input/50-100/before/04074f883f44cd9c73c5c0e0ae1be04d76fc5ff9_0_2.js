function() {
        this._ibus.list_engines_async(-1, null, Lang.bind(this, this._initEngines));
        this._ibus.connect('disconnected', Lang.bind(this, this._clear));
    }