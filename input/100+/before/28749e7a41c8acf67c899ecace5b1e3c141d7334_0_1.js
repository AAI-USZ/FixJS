function (img, name) {

		var options = this.options,

			size = options[name + 'Size'],

			anchor = options.iconAnchor;



		if (!anchor && size) {

			anchor = size.divideBy(2, true);

		}



		if (name === 'shadow' && anchor && options.shadowOffset) {

			anchor._add(options.shadowOffset);

		}



		img.className = 'leaflet-marker-' + name + ' ' + options.className + ' leaflet-zoom-animated';



		if (anchor) {

			img.style.marginLeft = (-anchor.x) + 'px';

			img.style.marginTop  = (-anchor.y) + 'px';

		}



		if (size) {

			img.style.width  = size.x + 'px';

			img.style.height = size.y + 'px';

		}

	}