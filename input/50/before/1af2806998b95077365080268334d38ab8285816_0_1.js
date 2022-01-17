function(){
			var mark = this.tl.timeMarkerPos/1000;
			return mark > this.cue.startTime && mark < this.cue.endTime;
		}