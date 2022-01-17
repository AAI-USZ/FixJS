function(){
	//find the element with the minimum key from timeStamp map and remove it from both maps
	var minKey = _findElemWithMinTs();
	if(minKey !== undefined){
	    delete entries[minKey];
	    delete timeStampMap[minKey];
	    count--;
	}
    }