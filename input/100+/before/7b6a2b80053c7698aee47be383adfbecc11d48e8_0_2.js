function (map) {

		this._map = null;



		map._pathRoot.removeChild(this._container);



		map.off({

			'viewreset': this.projectLatlngs,

			'moveend': this._updatePath

		}, this);

	}