function () {
		var d = new Date(calendar.last().time());
		d.setDate(0);  // yesterday
		d.setMonth(d.getMonth() + 2);
		return d;
	}