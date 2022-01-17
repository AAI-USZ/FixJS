function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer leaflet-zoom-animated');

		this._updateOpacity();

		//TODO createImage util method to remove duplication
		L.Util.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: L.Util.bind(this._onImageLoad, this),
			src: this._url
		});
	}