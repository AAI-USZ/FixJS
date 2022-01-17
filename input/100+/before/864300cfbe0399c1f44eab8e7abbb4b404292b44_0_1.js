function(elem) {
		var rects, shift;
		rects = elem.getClientRects();
		if(!rects || rects.length < 1) {
			// if there were no rects the elem had display none
			return -1;
		}
		shift = rects[0][this.offset_dir];
		// less the amount we already shifted to get to cp
		shift -= parseInt(this.getBody().style[this.offset_dir], 10); 
		return Math.ceil( shift / (this.page_width + this.gap_width) );
	}