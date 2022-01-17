function getVendorPrefix() {
		var property = {
			transform : '',
			MozTransform : '-moz-',
			WebkitTransform : '-webkit-',
			OTransform : '-o-',
			msTransform : '-ms-'
		};
		var style = document.documentElement.style;
		for (var p in property) {
			if (p in style) {
				return property[p];
			}
		}
		return null;
	}