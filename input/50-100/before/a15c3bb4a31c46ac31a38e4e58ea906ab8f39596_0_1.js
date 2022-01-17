function() {
		if(!$(this).val()) {
			if(selector && selector.display) 
				return;
			me.set_input_value('');			
		}
	}