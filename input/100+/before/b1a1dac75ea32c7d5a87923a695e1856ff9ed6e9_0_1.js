function (first, last, ticks) {
		var ticks  = ticks || 5,
		    slices = ticks - 1,
		    domain = last - first,
		    labels = [];

		labels.push(first);

		for (var i = 1; i < slices; i++) {
			labels.push(Math.ceil(first + domain/slices*i));
		}

		labels.push(last);
		return labels;
	}