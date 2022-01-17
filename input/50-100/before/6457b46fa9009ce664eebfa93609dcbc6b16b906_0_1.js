function(){
	//find the element with the minimum key from timeStamp map and remove it from both maps
	//Using Object.keys may be slower than it could be ??
	var keySet = Object.keys(timeStampMap);
	var minTimeStamp = Math.min.apply( Math, keySet );
	var minKey = timeStampMap[minTimeStamp];
	delete entries[minKey];
	delete timeStampMap[minTimeStamp];
	count--;
    }