function (change) {
		if (change.type === "Checkpoint") return false;

		return true;
	}