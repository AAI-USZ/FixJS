function (url, options) {

		L.Util.setOptions(this, options);



		// detecting retina displays, adjusting tileSize and zoom levels

		if (this.options.detectRetina && window.devicePixelRatio > 1 && this.options.maxZoom > 0) {

			this.options.tileSize = Math.floor(this.options.tileSize / 2);

			this.options.zoomOffset++;

			if (this.options.minZoom > 0) {

			   this.options.minZoom--;

			}

			this.options.maxZoom--;

		}



		this._url = url;



		var subdomains = this.options.subdomains;



		if (typeof subdomains === 'string') {

			this.options.subdomains = subdomains.split('');

		}

	}