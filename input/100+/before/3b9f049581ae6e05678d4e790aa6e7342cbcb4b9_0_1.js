function reset() {
		// Set selected character
		$('.character .order').val(order);
		
		// Reset field
		$('input').val(0);

		// Set default point
		$.each(default_point, function(key, value) {
			$('#based .attribute .' + key).val(value);
		});
		
		// Set character data
		$.each(based, function(key, value) {
			$.each(value, function(key2, value2) {
				if(key == 'skill')
					$('#based .skill .' + key2).val(value2);
				else
					$('#equip .based .' + key + ' .' + key2).val(value2);
			});
		});
	}