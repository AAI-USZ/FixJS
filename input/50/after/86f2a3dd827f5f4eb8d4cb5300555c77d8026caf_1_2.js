function(seg){
				return seg.deleted || !seg.track.active || seg.startTime > time || seg.endTime < time;
			}