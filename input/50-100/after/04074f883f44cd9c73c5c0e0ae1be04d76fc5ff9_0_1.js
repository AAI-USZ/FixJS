function() {
        if (this._panelService)
            this._panelService.destroy();
        if (this._ibus)
            this._ibus.destroy();

        this._ibus = null;
        this._panelService = null;
        this._candidatePopup.setPanelService(null);
        this._engines = {};
        this._ready = false;
    }