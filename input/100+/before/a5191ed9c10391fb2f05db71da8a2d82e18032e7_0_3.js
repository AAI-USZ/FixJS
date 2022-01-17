function(row, idx) {
            var rowOrigin = new Point(origin.x, origin.y);
            this.ctx.fillStyle = this.options.fontColor;
            this.ctx.textAlign = "center"
			if (this.options.showRowNames) {
				var rowText = MilkChart.escape(this.data.rowNames[idx]);
				if (rotateRowNames) {
					this.ctx.save();
					this.ctx.textAlign = "right";
					this.ctx.translate(rowOrigin.x+(this.rowWidth/2) + this.options.fontSize, this.bounds[1].y + 4);
					this.ctx.rotate(-1.57079633);
					if (this.data.rows.length * this.options.fontSize > this.chartWidth) {
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
					this.ctx.fillText(rowText, rowOrigin.x+(this.rowWidth/2),this.bounds[1].y+(this.rowPadding/2));
				}
			}
            
            row.each(function(value, colorIndex) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.colors[colorIndex % this.colors.length];
                var colHeight = Math.ceil(value*this.ratio) - 1; // 1 pixel for value line
				//console.log(colHeight);
				this.ctx.fillStyle = this.colors[colorIndex];
                this.ctx.fillRect(rowOrigin.x+rowPadding, rowOrigin.y-colHeight, colWidth, colHeight);
				if (this.options.columnBorder) {
					this.ctx.strokeStyle = this.options.columnBorderColor;
					this.ctx.lineWidth = this.options.columnBorderWeight;
					this.ctx.strokeRect(rowOrigin.x+rowPadding, rowOrigin.y-colHeight, colWidth, colHeight);
				}
				
                rowOrigin.x += colWidth;
            }.bind(this));
            origin.x += this.rowWidth;
        }