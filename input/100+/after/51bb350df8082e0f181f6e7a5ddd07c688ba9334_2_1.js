function View(tl, start, end){
		var startTime = 0, endTime = tl.length;
		this.tl = tl;
		
		Object.defineProperties(this,{
			startTime: {
				get: function(){ return startTime; },
				set: function(val){
					var maxtime;
					if(val < 0){ val = 0; }
					else{
						maxtime = endTime - tl.width/1000; // 1 ms/px maximum zoom
						if(val > maxtime){ val = maxtime; }
					}
					return startTime = val;
				}, enumerable: true
			},
			endTime: {
				get: function(){ return endTime; },
				set: function(val){
					var mintime;
					if(val > tl.length){ val = tl.length; }
					else{
						mintime = startTime + tl.width/1000; // 1 ms/px maximum zoom
						if(val < mintime){ val = mintime; }
					}
					return endTime = val;
				}, enumerable:true
			},
			move: {
				value: function(delta){
					if(delta > 0){
						if(endTime+delta <= tl.length){
							endTime += delta;
							startTime += delta;
						}else{
							startTime += tl.length-endTime;
							endTime = tl.length;
						}
					}else{
						if(startTime+delta >= 0){
							startTime += delta;
							endTime += delta;
						}else{
							endTime -= startTime;
							startTime = 0;
						}
					}
				},enumerable: true
			}
		});
	
		if(start < end){
			this.startTime = start;
			this.endTime = end;
		}else{
			this.endTime = start;
			this.startTime = end;
		}
	}