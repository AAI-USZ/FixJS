function onRefreshCache(data){
	GOLFER_CACHE={};
	for(var i=0;i< data.length; i++){
	   if(data[i].tp === "golfer"){
		GOLFER_CACHE[data[i].val] = data[i].lbl; 
	  }
	}

setSelectOptions("#golfScoreForm select[name=golfer_id]", GOLFER_CACHE);
}