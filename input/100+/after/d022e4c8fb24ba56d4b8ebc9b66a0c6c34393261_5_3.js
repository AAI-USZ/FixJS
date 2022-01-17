function(seg){
		if(this.selectedSegment != null){
			this.selectedSegment.selected = false;
		}
		if(this.selectedTrack && seg.track != this.selectedTrack.id){
			this.selectedTrack.active = false;
			this.selectedTrack = this.tracks[seg.track];
			this.selectedTrack.active = true;
			this.updateCurrentSegments();
		}else{
			this.selectedTrack = this.tracks[seg.track];
			this.selectedTrack.active = true;
			Array.prototype.push.apply(this.currentSegments,this.selectedTrack.searchRange(this.timeMarkerPos,this.timeMarkerPos));
			this.emit('segments',{
				valid:this.currentSegments,
				invalid:[]
			});
		}
		this.selectedSegment = seg;
		seg.selected = true;
		this.render();
		this.emit('select', seg);
	}