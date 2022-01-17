function () {
		var d = new Date(calendar.last().time());
		d.setDate(1);
		d.setMonth(d.getMonth() + 2);
		d.setDate(0);
		return d;
	}