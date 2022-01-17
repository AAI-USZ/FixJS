function() {
		var filter = this.getValue();
		if (filter) {
			this.preview_store.clearFilter();
			log.debug('Showing preview with filter: ' + filter, this.logAuthor);
			this.preview_store.setFilter(filter);
			this.preview_store.load();
			this.cfilter.hide();
			this.edit_area.hide();
			this.preview_grid.show();
			
			this.wizard_button.setDisabled(false);
			this.edit_button.setDisabled(false);
			this.preview_button.setDisabled(true);
		}
	}