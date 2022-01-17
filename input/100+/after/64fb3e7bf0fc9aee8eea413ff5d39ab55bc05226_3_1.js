function(x0, y0)  {
		if (x0 < 0 || x0 >= this.width ||
			y0 < 0 || y0 >= this.height)
			return;

		this.cells[x0][y0] = 0;
	}