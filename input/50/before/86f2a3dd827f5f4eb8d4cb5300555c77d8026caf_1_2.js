function(seg){
				return !seg.track.active || seg.startTime > time || seg.endTime < time;
			}