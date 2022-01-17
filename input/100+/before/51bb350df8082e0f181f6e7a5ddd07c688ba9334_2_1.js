function View(tl, startTime, endTime){
		this.tl = tl;
		if(startTime < endTime){
			this.startTime = startTime;
			this.endTime = endTime;
		}else{
			this.endTime = startTime;
			this.startTime = endTime;
		}
	}