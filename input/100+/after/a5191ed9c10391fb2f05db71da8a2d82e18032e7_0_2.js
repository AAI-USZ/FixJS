function() {
        var rowNameLength = 0;
        this.data.rowNames.each(function(row) {
            rowNameLength += this.ctx.measureText(row).width;
        }, this);
        var rotateRowNames = (rowNameLength > this.chartWidth);
        if (rotateRowNames) {
            this.rowPadding = this.ctx.measureText(this.longestRowName).width;
        }
        else {
            this.rowPadding = (this.ctx.measureText(this.longestRowName).width > ((this.bounds[1].x - this.bounds[0].x) / this.data.rows.length)) ? this.ctx.measureText(this.longestRowName).width : this.height * 0.1;
        }
    }