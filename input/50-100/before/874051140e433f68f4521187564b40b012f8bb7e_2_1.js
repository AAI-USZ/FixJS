function (citation, reference, option) {
		var options = getCitationOptions();
		options[citation] = options[citation] || {};
		options[citation][reference] = option;
		setCitationOptions(options);
	}