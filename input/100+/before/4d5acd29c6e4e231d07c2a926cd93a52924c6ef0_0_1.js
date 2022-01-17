function() {
		if(!this.edit_area.isHidden()){
			if (this.edit_area.validate()) {
				var filter = this.edit_area.getValue();
				filter = strip_blanks(filter);
				this.cfilter.remove_all_cfilter();
				this.setValue(filter);
			}else {
				log.debug('Incorrect JSON given', this.logAuthor);
				return false
			}
		}
			
		this.edit_area.hide();
		this.preview_grid.hide();
		this.cfilter.show();
		
		this.wizard_button.setDisabled(true);
		this.edit_button.setDisabled(false);
		this.preview_button.setDisabled(false);
		return true
	}