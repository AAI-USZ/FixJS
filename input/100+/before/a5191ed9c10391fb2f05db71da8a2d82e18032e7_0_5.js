function(item, idx) {
            // Draw row labels
            var rowText = MilkChart.escape(this.data.rowNames[idx]);
			if (rotateRowNames) {
				this.ctx.save();
				this.ctx.textAlign = "right";
				this.ctx.translate(origin.x+(this.rowWidth/2) + this.options.fontSize, this.bounds[1].y + 4);
				this.ctx.rotate(-1.57079633);
				if (this.data.rowNames.length * this.options.fontSize > this.chartWidth) {
					if (idx % 8 == 1) {
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
        }