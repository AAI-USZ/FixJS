function (srm) {
		var low, high;

		low = srm * 12.2 - 122.4;
		high = (srm - 5.2) * 12.2;

		return ( low + high ) / 2;
	}