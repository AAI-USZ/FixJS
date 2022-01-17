function (data) {

			var feature, style, type, geom, len, i;

			data = JSON.parse(data.response)
			for (i = 0; i < data.features.length; i++) {
				feature = data.features[i];
				style = self.styleFor(feature);
				type = feature.geometry.type;
				geom = feature.geometry.coordinates;
				if(geom) {
					len = geom.length;
					switch (type) {
						case 'Point':
							self._drawPoint(ctx, geom, style);
							break;

						case 'MultiPoint':
							for (j = 0; j < len; j++) {
								self._drawPoint(ctx, geom[j], style);
							}
							break;

						case 'LineString':
							self._drawLineString(ctx, geom, style);
							break;

						case 'MultiLineString':
							for (j = 0; j < len; j++) {
								self._drawLineString(ctx, geom[j], style);
							}
							break;

						case 'Polygon':
							self._drawPolygon(ctx, geom, style);
							break;

						case 'MultiPolygon':
							for (j = 0; j < len; j++) {
								self._drawPolygon(ctx, geom[j], style);
							}
							break;

						default:
							throw new Error('Unmanaged type: ' + type);
					}
				}
			}
		}