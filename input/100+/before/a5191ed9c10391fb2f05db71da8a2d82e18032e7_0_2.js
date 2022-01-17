function() {
    	this.rowPadding = (this.ctx.measureText(this.longestRowName).width > ((this.bounds[1].x - this.bounds[0].x) / this.data.rows.length)) ? this.ctx.measureText(this.longestRowName).width : this.height * 0.1;
    }