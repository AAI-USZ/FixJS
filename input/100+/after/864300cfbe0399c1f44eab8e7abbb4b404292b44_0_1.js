function(elem) {

		var rects, shift;
		rects = elem.getClientRects();
		if(!rects || rects.length < 1) {
			// if there were no rects the elem had display none
			return -1;
		}
		shift = rects[0][this.offset_dir];

		// `clientRects` are relative to the top left corner of the frame, but
		// for right to left we actually need to measure relative to right edge
		// of the frame
		if(this.offset_dir === "right") {
			// the right edge is exactly `this.page_width` pixels from the right 
			// edge
			shift = this.page_width - shift;
		}
		// less the amount we already shifted to get to cp
		shift -= parseInt(this.getBody().style[this.offset_dir], 10); 
		return Math.ceil( shift / (this.page_width + this.gap_width) );
	}