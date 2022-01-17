function() {
			if (this._hasSizeDimensions()) {
				var widestRowWidth = 0,
					tallestRowHeight = 0;
				for(var i in this._rows) {
					var row = this._rows[i];
					tallestRowHeight = Math.max(tallestRowHeight, row._measureText(row.title, row.domNode).height);
				}
				return tallestRowHeight;
			}
		}