function() {
		if (!this.options.copy && this.element.get('tag') == "table") {
			this.element.setStyle('display', 'none');
		}
        
        // Fill our canvas' bg color
        this.ctx.fillStyle = this.options.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.font = this.options.fontSize + "px " + this.options.font;
        
        if (this.options.border) {
			this.ctx.lineWeight = this.options.borderWeight;
            this.ctx.strokeRect(0.5,0.5,this.width-1, this.height-1);
        }
        
        if (this.options.showValues) {
            // Accomodate the width of the values column
            this.bounds[0].x += this.getValueColumnWidth();
        }
        
        this.bounds[0].x += this.options.padding;
        this.bounds[0].y += this.options.padding;
        this.bounds[1].x -= this.options.padding*2;
        this.bounds[1].y -= this.options.padding*2;
        
        if (this.options.showKey) {
            // Apply key padding
            var longestName = "";
            this.data.colNames.each(function(col) {
            	if (col.length > longestName.length) {
	            	longestName = String(col);
	            }
            });
            var colorSquareWidth = 14
            this.keyPadding = this.ctx.measureText(longestName).width + colorSquareWidth;
            this.bounds[1].x -= this.keyPadding;
            // Set key bounds
            var chartKeyPadding = 1.02;
            this.keyBounds = [
                new Point(this.bounds[1].x * chartKeyPadding, this.bounds[0].y),
                new Point(this.keyPadding, this.bounds[1].y)
            ];
        }
        
        if (this.data.title) {
            titleHeight = this.bounds[0].y + this.height * .1;
            this.bounds[0].y = titleHeight;
            this.titleBounds = [new Point(this.bounds[0].x, 0), new Point(this.bounds[1].x, titleHeight)];
            this.drawTitle();
        }
        this.chartWidth = this.bounds[1].x - this.bounds[0].x;
        if (this.options.showRowNames) {
			this.ctx.font = this.options.fontSize + "px " + this.options.font;
			this.getRowPadding();
			this.bounds[1].y -= this.rowPadding;
		}
		else {
			this.rowPadding = 0;
		}
        
        
        this.chartHeight = this.bounds[1].y - this.bounds[0].y;
        this.colors = this.__getColors(this.options.colors);
    }