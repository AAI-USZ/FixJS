function(pos) {
	var tl = this.tl,
		seg, e;
		
	this.endX = pos.x;

	// Create a new segment
	if(this.startX < this.endX){
		start = tl.pixelToTime(this.startX);
		end   = tl.pixelToTime(this.endX);
	}else{
		start = tl.pixelToTime(this.endX);
		end   = tl.pixelToTime(this.startX);
	}
	
	seg = new Segment(this.tl, start, end, "", ""+start);

	// Add the segment to its track
	tl.tracks[this.track].add(seg);
}