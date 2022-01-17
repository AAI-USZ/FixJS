function() {
			if (this._hasSizeDimensions()) {
				var widestRowWidth = 0;
				for(var i in this._rows) {
					var row = this._rows[i];
					widestRowWidth = Math.max(widestRowWidth, row._measureText(row.title, row.domNode).width);
				}
				if (this._widestRowWidth !== widestRowWidth) {
					this._widestRowWidth = widestRowWidth;
					this._triggerLayout();
				}
			}
		}