function() {
			var widestRowWidth = 0,
				i = 0,
				len = this._rows.length;
			for(; i < len; i++) {
				var row = this._rows[i];
				widestRowWidth = Math.max(widestRowWidth, row._measureText(row.title, row.domNode).width);
			}
			if (this._widestRowWidth !== widestRowWidth) {
				this._widestRowWidth = widestRowWidth;
			}
		}