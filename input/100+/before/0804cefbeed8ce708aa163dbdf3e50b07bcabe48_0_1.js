function() {
        for (let i = 0; i < this._windows.length; i++) {
            let clone = this._windows[i];
            let overlay = this._windowOverlays[i];
            if (overlay)
                overlay.hide();
        }
    }