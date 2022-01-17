function(low, high){
		return this.segments.filter(function(seg){
			return seg.startTime < high && seg.endTime > low;
		});
		/*var segs = this.segments,
			len = segs.length,
			startIndex  = 0,
			stopIndex   = len - 1,
			middle      = Math.floor(stopIndex/2),
			scan;

		while(startIndex < stopIndex){
			if(segs[middle].endTime < low){
				startIndex = middle + 1;
			}else if(segs[middle].startTime > high){
				stopIndex = middle - 1;
			}else{break;}
			middle = Math.floor((stopIndex + startIndex)/2);
		}
		if(stopIndex == 0 || startIndex == len){
			return [];
		}
		while(scan >= 0 && segs[scan].endTime > low){
			scan--;
		}
		while(middle < len && segs[middle].startTime < high){
			middle++;
		}
		return segs.slice(scan+1,middle);
		//return segs.slice(searchLow(segs,low,middle),searchHigh(segs,high,middle));
		*/
	}