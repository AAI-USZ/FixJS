function (citation, reference) {
		var options = getCitationOptions(),
			option;
		if (!options.hasOwnProperty(citation)) {
			return 0;
		}
		if (!options[citation].hasOwnProperty(reference)) {
			return 0;
		}
		option = options[citation][reference];
		if (option >= CSLEDIT.exampleData.additionalOptions.length) {
			option = 0;
		}
		return option;
	}