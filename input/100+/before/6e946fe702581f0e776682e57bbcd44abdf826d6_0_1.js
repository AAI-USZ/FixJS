function() {
	this.parent('media-eject');

	this._manager = Main.placesManager;
	this._updatedId = this._manager.connect('mounts-updated', Lang.bind(this, this._update));

	this._contentSection = new PopupMenu.PopupMenuSection();
	this.menu.addMenuItem(this._contentSection);

	this._update();

	this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
	this.menu.addAction(_("Open file manager"), function(event) {
	    let appSystem = Shell.AppSystem.get_default();
	    let app = appSystem.lookup_app('nautilus.desktop');
	    app.activate_full(-1, event.get_time());
	});
    }