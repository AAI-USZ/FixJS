function(time, unit) {

		if (unit.name == 'month') {
			var nearFuture = new Date((time + unit.seconds - 1) * 1000);
			return new Date(nearFuture.getUTCFullYear(), nearFuture.getUTCMonth() + 1, 1, 0, 0, 0, 0).getTime() / 1000;
		}

		if (unit.name == 'year') {
			var nearFuture = new Date((time + unit.seconds - 1) * 1000);
			return new Date(nearFuture.getUTCFullYear(), 1, 1, 0, 0, 0, 0).getTime() / 1000;
		}

		return Math.ceil(time / unit.seconds) * unit.seconds;
	}