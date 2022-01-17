function(attributesLong) {
			return $('<input type="text" '+attributesLong+' pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">').datepicker({
				dateFormat: 'yy-mm-dd'
			});
		}