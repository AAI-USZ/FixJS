function jQuery_prototype_quickHeight (which) {
		return parseInt($.css(this[which || 0], 'height'), 10);
	}