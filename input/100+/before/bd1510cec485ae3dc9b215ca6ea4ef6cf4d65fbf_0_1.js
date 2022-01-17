function () {
		var prefix = 'leaflet-popup',
			container = this._container = L.DomUtil.create('div', prefix + ' ' + this.options.className + ' leaflet-zoom-animated'),
			closeButton;

		if (this.options.closeButton) {
			closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
		L.DomEvent.disableClickPropagation(wrapper);

		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
		L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	}