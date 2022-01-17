function (tab) {
		// Returns selected tab instead set it
		// Getter
		if (!tab) {
			return (selected + 1);
		}

		// Setter
		select(tab);
		return that["public"];

	}