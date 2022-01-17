function (item) {
		// Getter
		if (!item) {
			if (isNaN(selected)) {
				return "";
			}
			return selected + 1;
		}

		// Setter
		select(item);
		return that["public"];
	}