function(dump) {
		//ajax request with dump sending
		log.debug('Saving view '+this.view_id, this.logAuthor);

		if (dump == undefined) {
			dump = this.dumpJqGridable();
		}

		//get view options
		if (this.getViewOptions)
			var view_options = this.getViewOptions();

		// Update view
		if (this.view_id){
			var data = {
				'crecord_name': this.view.crecord_name,
				'items': dump,
				'view_options': view_options
			}
			updateRecord('object', 'view', 'canopsis.model.View', this.view_id, data)
		}
		
		this.dump = dump;

		this.startAllTasks();

		//apply new view style
		this.applyViewOptions(view_options);
	}