function() {
        let app = this._appIcons[this._currentApp];
        if (app) {
            Main.activateWindow(app.cachedWindows[0]);
        }
        this.destroy();
    }