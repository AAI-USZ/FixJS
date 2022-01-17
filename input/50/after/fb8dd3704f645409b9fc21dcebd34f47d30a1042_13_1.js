function() {
			this._updateContentWidth();
			this._parentPicker && this._parentPicker._updateColumnHeights();
			return true;
		}