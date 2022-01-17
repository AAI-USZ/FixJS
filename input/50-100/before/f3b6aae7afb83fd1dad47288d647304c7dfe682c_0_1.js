function()
	{
	    Main.panel._rightBox.insert_child_at_index(this.actor, 0);
	    Main.panel._menus.addMenu(this.menu);

	    // Refresh menu
	    let fileM = Gio.file_new_for_path(this.file[0]);
	    this.monitor = fileM.monitor(Gio.FileMonitorFlags.NONE, null);
	    this.monitor.connect('changed', Lang.bind(this, this._refresh));
	}