function processSegments(segments, onSuccess, onError, onNotFound){
	
	var params = {
		resultStream: null
	}
	
	var nexts = [];
	var context = {
		headers: {},
		cacheable: false
	}
	//Construct event chain look ahead.
	for(var i=0; i<segments.length; i++){
		nexts[i]= getProcessSegment(segments[i], i+1, onSuccess, onError, onNotFound, params, nexts, context);
	}
	//Build the chain
	nexts[0]();
}