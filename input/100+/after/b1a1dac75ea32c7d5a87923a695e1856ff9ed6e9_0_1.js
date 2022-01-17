function (first, last, ticks) {
		var domain = last - first,
			ticks  = (ticks >= domain) ? (domain + 1) : ticks,
		    slices = ticks - 1,

		    val, labels = [];

		labels.push(first);

		for (var i = 1; i < slices; i++) {
			val = first + domain / slices * i;
			if (Math.abs(val) < 10) {
				labels.push((val % 1 == 0) ? val : Math.ceil(val * 100) / 100); // display 2 digits when precision needed
			} else {
				labels.push(Math.floor(val));
			}
		}

		labels.push(last);
		return labels;
	}