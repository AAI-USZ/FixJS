function(key, value) {
			if(key != 'skill')
				$.each(value, function(key2, value2) {
					total[key2] += parseFloat(value2);
				});
		}