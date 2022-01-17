function() {
		var filter = this.getValue();
		if (filter) {
			this.preview_store.clearFilter();
			log.debug('Showing preview with filter: ' + filter, this.logAuthor);
			this.preview_store.setFilter(filter);
			this.preview_store.load();
			
			this.switch_elements_visibility(false,false,true)
			this.switch_button_state(true,true,false)
		}
	}