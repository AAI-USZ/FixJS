function(low, high){
		//TODO: Higher efficiency binary search
		return this.segments.filter(function(seg){
			return !seg.deleted && seg.startTime < high && seg.endTime > low;
		});
	}