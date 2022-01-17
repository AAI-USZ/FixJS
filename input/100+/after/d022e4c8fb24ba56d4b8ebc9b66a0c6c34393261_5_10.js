function(){
		var that = this,
			time = this.timeMarkerPos,
			oldsegs = this.currentSegments,
			cursegs = [];
		this.tracks.forEach(function(track){
			if(track.active){Array.prototype.push.apply(cursegs,track.searchRange(time,time));}
		});
		this.currentSegments = cursegs;
		this.emit('segments',{
			valid:cursegs,
			invalid:oldsegs.filter(function(seg){
				return !that.tracks[seg.track].active || seg.startTime > time || seg.endTime < time;
			})
		});
	}