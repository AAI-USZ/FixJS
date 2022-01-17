function (ev) {
		var city = $(this).val();
		
		if (city.match(/[a-zA-z]/)) {
			$('.city-correct').attr('data-status', 'correct');
			cityCheck = true;
		}
		if (city.match(/[0-9]/)){
			$('.city-correct').attr('data-status', 'incorrect');
			cityCheck = false;
		}
		if (city.match(/[^a-zA-z0-9\s]/)){
			$('.city-correct').attr('data-status', 'correct');
			cityCheck = false;
		}
	}