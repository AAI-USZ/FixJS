function() {
		var val = $(this).val();//me.get_value();

		me.set_input_value_executed = false;
		
		if(!val) {
			if(selector && selector.display) 
				return;
			me.set_input_value('');			
		} else {
			// SetTimeout hack! if in put is set via autocomplete, do not validate twice
			setTimeout(function() {
				if (!me.set_input_value_executed) {
					me.set_input_value(val);
				}
			}, 100);
		}
	}