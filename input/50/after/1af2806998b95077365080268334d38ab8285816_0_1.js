function(){
			var mark = this.tl.timeMarkerPos;
			return mark > this.cue.startTime && mark < this.cue.endTime;
		}