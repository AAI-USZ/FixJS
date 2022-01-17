function(checked) {
		var store = this.getTasksStore();
		store.each(function(record) {
			record.set('checked', checked);
		});
		store.sync();
	}