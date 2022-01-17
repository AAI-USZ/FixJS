function (content) {

		this._popupContent = content;

		return this.invoke('bindPopup', content);

	}