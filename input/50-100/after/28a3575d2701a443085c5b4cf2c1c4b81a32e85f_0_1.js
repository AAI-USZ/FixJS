function() {
		var filter = Ext.decode(this.getValue());
		if(filter){
			filter = JSON.stringify(filter, undefined, 8);
			this.edit_area.setValue(filter);
		}
		this.switch_elements_visibility(false,true,false)
		this.switch_button_state(true,false,true)
	}