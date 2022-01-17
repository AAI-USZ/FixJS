function() {
        let currentWorkspace = global.screen.get_active_workspace();
        for (let i = 0; i < this._windows.length; i++) {
            let clone = this._windows[i];
            let overlay = this._windowOverlays[i];
            this._showWindowOverlay(clone, overlay,
                                    this.metaWorkspace == null || this.metaWorkspace == currentWorkspace);
        }
    }