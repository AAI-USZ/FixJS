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

		if (this.view_id) {
			log.debug(' + Update view', this.logAuthor);
			var record = store.getById(this.view_id);
			//Update record
			record.set({
				'crecord_name': this.view.crecord_name,
				'items': dump,
				'view_options': view_options
			});
			
		} else {
			log.debug(' + New view', this.logAuthor);
			if (this.options.viewName) {
				var viewName = this.options.viewName;
				data['crecord_name'] = viewName
				data['id'] = 'view.' + global.account.user + '.' + viewName.replace(/ /g, '_')
				data['view_options'] = view_options
				data['leaf'] = true
				
				// Add record
				var record = Ext.create('canopsis.model.View', data);
				store.add(record);
			}
		}
		
		this.dump = dump;

		this.startAllTasks();

		//apply new view style
		this.applyViewOptions(view_options);

		global.notify.notify(_('View') + ' ' + record.get('crecord_name'), _('Saved'));
	}