function(inPageNo, inTarget) {
		this.page = inPageNo;
		var r = this.$.generator.rowOffset = this.rowsPerPage * this.page;
		var rpp = this.$.generator.count = Math.min(this.count - r, this.rowsPerPage);
		var html = this.$.generator.generateChildHtml();
		inTarget.setContent(html);
		// if rowHeight is not set, use the height from the first generated page
		if (!this.rowHeight) {
			this.rowHeight = Math.floor(inTarget.getBounds().height / rpp);
			this.updateMetrics();
		}
		// update known page heights
		if (!this.fixedHeight) {
			var h0 = this.getPageHeight(inPageNo);
			var h1 = inTarget.getBounds().height;
			if (h0 != h1 && h1 != 0) {
				this.pageHeights[inPageNo] = h1;
				this.portSize += h1 - h0;
			}
		}
	}