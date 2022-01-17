function (tab) {
		// Returns selected tab instead set it
		// Getter
		if (!parseInt(tab)) {
			return selected;
		}

		// Setter
		select(tab -= 1);
		return that["public"];

	}