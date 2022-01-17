function(plane) {
		if (typeof(plane) != "string" || !(plane == 'x' || plane == 'y' || plane == 'z')) {
			throw new Error("plane has to be one of the following: 'z', 'y' or 'z'");
		}
		this.plane = plane;
	}