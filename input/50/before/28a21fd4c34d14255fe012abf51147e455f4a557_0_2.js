function (type) { // (String) -> Boolean
		var k = '_leaflet_events';
		return (k in this) && (type in this[k]) && (this[k][type].length > 0);
	}