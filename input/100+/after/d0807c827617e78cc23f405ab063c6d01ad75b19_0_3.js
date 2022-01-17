function(lookingGlass) {
        this.actor = new St.BoxLayout({ name: 'Windows', vertical: true, style: 'spacing: 8px' });
        let tracker = Shell.WindowTracker.get_default();
        this._updateId = Main.initializeDeferredWork(this.actor, Lang.bind(this, this._updateWindowList));
        global.display.connect('window-created', Lang.bind(this, this._updateWindowList));
        tracker.connect('tracked-windows-changed', Lang.bind(this, this._updateWindowList));

        this._lookingGlass = lookingGlass;
    }