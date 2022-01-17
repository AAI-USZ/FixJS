function() {
			var widestRowWidth = 0,
				tallestRowHeight = 0,
				i = 0,
				len = this._rows.length;
			for(; i < len; i++) {
				var row = this._rows[i];
				tallestRowHeight = Math.max(tallestRowHeight, row._measureText(row.title, row.domNode).height);
			}
			return tallestRowHeight;
		}