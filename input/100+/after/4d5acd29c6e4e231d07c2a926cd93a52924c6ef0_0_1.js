function() {
		if(!this.edit_area.isHidden()){
			if (this.edit_area.validate()) {
				var filter = this.edit_area.getValue();
				filter = strip_blanks(filter);
				this.cfilter.remove_all_cfilter();
				this.setValue(filter);
				
				this.switch_elements_visibility(true,false,false)
				this.switch_button_state(false,true,true)
			}else {
				log.debug('Incorrect JSON given', this.logAuthor);
			}
		}else{
			this.switch_elements_visibility(true,false,false)
			this.switch_button_state(false,true,true)
		}
	}