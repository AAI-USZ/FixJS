function() {
        let app = this._appIcons[this._currentApp];
        Main.activateWindow(app.cachedWindows[0]);
        this.destroy();
    }