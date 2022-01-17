function (img, name) {

		var options = this.options,

			anchor = options.iconAnchor,

			popupAnchor = options.popupAnchor;



		/* If size is defined, use defined value. Otherwise, set size equal to

		 * the actual size of the imageUrl upon image load */

		var size;

		/* Size is defined */

		if (options[name + 'Size']) {

			size = options[name + 'Size'];

			if (!anchor && size) {

				anchor = new L.Point(Math.round(size.x / 2), size.y);

			}

			if (name === 'icon' && !popupAnchor && size) {

				popupAnchor = new L.Point(0, -Math.round((size.y * 8) / 10));

			}

			if (name === 'shadow' && anchor && options.shadowOffset) {

				anchor._add(options.shadowOffset);

			}



			img.className = 'leaflet-marker-' + name + ' ' + options.className + ' leaflet-zoom-animated';

			img.style.width	 = size.x + 'px';

			img.style.height = size.y + 'px';



			if (anchor) {

				img.style.marginLeft = (-anchor.x) + 'px';

				img.style.marginTop	 = (-anchor.y) + 'px';

			}

		}

		/* Otherwise, size is not defined. Load in size from image */

		else {

			img.onload = function () {

				size = new L.Point(this.width, this.height);

				if (!anchor && size) {

					anchor = new L.Point(Math.round(size.x / 2), size.y);

				}

				if (name === 'icon' && !popupAnchor && size) {

					popupAnchor = new L.Point(0, -Math.round((size.y * 8) / 10));

				}

				if (name === 'shadow' && anchor && options.shadowOffset) {

					anchor._add(options.shadowOffset);

				}



				this.className = 'leaflet-marker-' + name + ' ' + options.className + ' leaflet-zoom-animated';



				if (anchor) {

					this.style.marginLeft = (-anchor.x) + 'px';

					this.style.marginTop  = (-anchor.y) + 'px';

				}

			};

		}

	}