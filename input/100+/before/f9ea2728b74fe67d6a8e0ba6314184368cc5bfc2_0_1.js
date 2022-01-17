function (url, options) { // (String, Object)

		this._url = url;



		var wmsParams = L.Util.extend({}, this.defaultWmsParams);

		wmsParams.width = wmsParams.height = this.options.tileSize;



		for (var i in options) {

			// all keys that are not TileLayer options go to WMS params

			if (!this.options.hasOwnProperty(i)) {

				wmsParams[i] = options[i];

			}

		}



		this.wmsParams = wmsParams;



		L.Util.setOptions(this, options);

	}