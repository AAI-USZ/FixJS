function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer leaflet-zoom-hide');

		this._image.style.visibility = 'hidden';

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