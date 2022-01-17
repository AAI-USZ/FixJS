function(seg){
		if(this.selectedSegment != null){
			this.selectedSegment.selected = false;
		}
		this.selectedSegment = seg;
		seg.selected = true;
		this.updateCurrentSegments();
		this.emit('select', seg);
	}