function () {
		if (this._popup) {
			this
				.removeLayer(this._popup)
				.fire('popupclose', {popup: this._popup});

			this._popup = null;
		}
		return this;
	}