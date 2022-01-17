function (url, options) {

		L.Util.setOptions(this, options);



		// detecting retina displays, adjusting tileSize and zoom levels

		if (this.options.detectRetina

			&& window.devicePixelRatio > 1

			&& options.maxZoom > 0

		){

			this.options.tileSize >>= 1;

			options.zoomOffset++;

			if (options.minZoom > 0) options.minZoom--;

			options.maxZoom--;

		}



		this._url = url;



		var subdomains = this.options.subdomains;



		if (typeof subdomains === 'string') {

			this.options.subdomains = subdomains.split('');

		}

	}