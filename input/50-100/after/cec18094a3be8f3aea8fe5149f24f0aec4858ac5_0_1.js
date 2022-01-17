function (content, options) {

		if (!this._popup || this._popup.options !== options) {

			this._popup = new L.Popup(options, this);

		}

		this._popup.setContent(content);



		if (!this._openPopupAdded) {

			this.on('click', this._openPopup, this);

			this._openPopupAdded = true;

		}



		return this;

	}