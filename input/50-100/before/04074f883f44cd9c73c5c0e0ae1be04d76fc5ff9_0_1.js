function() {
        if (this._ibus)
            this._ibus.destroy();

        this._ibus = null;
        this._engines = {};
        this._ready = false;
    }