function(actor) {
        this.metaWorkspace.disconnect(this._windowAddedId);
        this.metaWorkspace.disconnect(this._windowRemovedId);
        global.screen.disconnect(this._windowEnteredMonitorId);
        global.screen.disconnect(this._windowLeftMonitorId);

        for (let i = 0; i < this._windows.length; i++) {
            let metaWin = this._windows[i].metaWindow;
            if (metaWin._minimizedChangedId) {
                metaWin.disconnect(metaWin._minimizedChangedId);
                delete metaWin._minimizedChangedId;
            }
            this._windows[i].destroy();
        }

        this._windows = [];
        this.title = null;
        this.actor = null;        
    }