function (feature) {
		var type = feature.geometry.type;
		if (this.options.style.callback) {
			return this.options.style.callback(feature);
		}
		switch (type) {
			case 'Point':
			case 'MultiPoint':
				return this.options.style.point;

			case 'LineString':
			case 'MultiLineString':
				return this.options.style.line; 

			case 'Polygon':
			case 'MultiPolygon':
				return this.options.style.polygon;

			default:
				return null;
		}
	}