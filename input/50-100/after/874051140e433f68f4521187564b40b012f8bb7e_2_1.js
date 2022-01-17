function (citation, reference, option) {
		var options = getCitationOptions();
		if (option >= CSLEDIT.exampleData.additionalOptions.length) {
			option = 0;
		}
		options[citation] = options[citation] || {};
		options[citation][reference] = option;
		setCitationOptions(options);
	}