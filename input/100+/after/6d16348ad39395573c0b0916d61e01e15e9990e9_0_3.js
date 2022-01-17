function(name) {
		var title = name ? T('title.runstatus_history') + ' (' + name + ') ' : T('title.runstatus_history');
		this.sub('runstatus_panel').setTitle(title);
	}