function(x0, y0) {
		if (x0 < 0 || x0 >= this.width ||
			y0 < 0 || y0 >= this.height)
			return;

		this.cells[x0][y0] = this.color;

		if (this.lineWidth > 1) {
			var d = this.lineWidth / 2;
			for (var x = 0; x < d; x++) {
				for (var y = 0; y < d; y++) {
					this.cells[x0 + x][y0 + y] = this.color;
					this.cells[x0 + x][y0 - y] = this.color;
					this.cells[x0 - x][y0 - y] = this.color;
					this.cells[x0 - x][y0 - y] = this.color;
				}
			}
		}
	}