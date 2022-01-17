function(position) {
		if(position < this.data.length) {
			if(this.selectedRow == position)
				this.fireEvent('unselect', this, this.selectedRow);
			this.data.splice(position, 1);
			for(var col = 0; col < this.headers.length; col++) {
				var cell = this.headers[col].rows[position];
				if(this.selectedRow == position)
					cell.unselect();
				this.disconnect(cell, 'down', this.onCellDown);
				this.disconnect(cell, 'up', this.onCellUp);
				this.disconnect(cell, 'select', this.onCellSelect);
				this.disconnect(cell, 'activate', this.onCellActivate);
				this.rowContainer.removeChild(cell);
				this.headers[col].rows.splice(position, 1);
			}
			if(this.selectedRow != undefined) {
				if(this.selectedRow == position)
					this.selectedRow = undefined;
				else if(position < this.selectedRow)
					this.selectedRow--;
			}
			this.invalidateMeasure();
		}
	}