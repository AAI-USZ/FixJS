function(dump) {
		//ajax request with dump sending
		log.debug('Saving view requested', this.logAuthor);

		if (dump == undefined) {
			dump = this.dumpJqGridable();
		}

		//get view options
		if (this.getViewOptions)
			var view_options = this.getViewOptions();

		var store = Ext.data.StoreManager.lookup('Views');
		var record = Ext.create('canopsis.model.View', data);

		if (this.view_id) {
			log.debug('editing view', this.logAuthor);
			record.set('id', this.view_id);
			record.set('crecord_name', this.view.crecord_name);
		} else {
			log.debug('new view');
			if (this.options.viewName) {
				viewName = this.options.viewName;
				record.set('crecord_name', this.options.viewName);
				record.set('id', 'view.' + global.account.user + '.' + viewName.replace(/ /g, '_'));
			}
		}
		record.set('items', dump);
		record.set('view_options', view_options);
		record.set('leaf', true);

		store.add(record);

		this.dump = dump;

		this.startAllTasks();

		//apply new view style
		this.applyViewOptions(view_options);

		global.notify.notify(_('View') + ' ' + record.get('crecord_name'), _('Saved'));
	}