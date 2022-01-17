function (citation, reference) {
		var options = getCitationOptions();
		if (!options.hasOwnProperty(citation)) {
			return 0;
		}
		if (!options[citation].hasOwnProperty(reference)) {
			return 0;
		}
		return options[citation][reference];
	}