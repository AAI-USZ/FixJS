function(renderer, x0, y0, width, height) {
    	height = (height === undefined ? width : height);
    	this.setSize(width, height);
    	this.generate(width, height);
    	this.cleanNoiseCells();

    	renderer.setLineWidth(1);

    	for (var x = 0; x < this.width; x++) {
    		for (var y = 0; y < this.height; y++) {
    			if (this.cells[x][y] !== 0) {
    				renderer.setColor(this.cells[x][y]);
    				renderer.plot(x0 + x, y0 + y);
    			}
    		}
    	}
    }