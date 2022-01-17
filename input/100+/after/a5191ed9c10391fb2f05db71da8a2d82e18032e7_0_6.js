function() {
        var origin = new Point(this.bounds[0].x, this.bounds[1].y);
        var rowCenter = this.rowWidth / 2;
        // Should we rotate row names?
        var rotateRowNames = (this.ctx.measureText(this.longestRowName).width > this.rowWidth);
        var divisor = Math.floor((this.data.rowNames.length * this.options.fontSize) / (this.chartWidth / 2));
        
        this.ctx.fillStyle = this.options.fontColor;
        this.ctx.lineWidth = 1;
        this.ctx.textAlign = "center"
        
        this.data.rowNames.each(function(item, idx) {
            // Draw row labels
            var rowText = MilkChart.escape(this.data.rowNames[idx]);
			if (rotateRowNames) {
				this.ctx.save();
				this.ctx.textAlign = "right";
				this.ctx.translate(origin.x+(this.rowWidth/2) + this.options.fontSize, this.bounds[1].y + 4);
				this.ctx.rotate(-1.57079633);
				if (this.data.rowNames.length * this.options.fontSize > this.chartWidth) {
					if (idx % divisor == 1) {
						this.ctx.fillText(rowText, 0, 0);
					}
				}
				else {
					this.ctx.fillText(rowText, 0, 0);
				}
				this.ctx.restore();
			}
			else {
				this.ctx.fillText(rowText, origin.x+(this.rowWidth/2),this.bounds[1].y+(this.rowPadding/2));
			}
            origin.x += this.rowWidth;
        }.bind(this))
    }