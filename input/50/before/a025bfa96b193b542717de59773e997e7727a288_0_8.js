function jQuery_prototype_quickWidth (which) {
		return parseInt($.css(this[which || 0], 'width'), 10);
	}