function() {
			this._updateContentWidth();
			this._parentPicker && this._parentPicker._updateColumnHeights();
			
			return FontWidget.prototype._doLayout.apply(this,arguments);
		}