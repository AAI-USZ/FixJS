function (labelText) {
		if (!this._errorShown) {
			L.Handler.Draw.prototype._updateLabelText.call(this, labelText);
		}
	}