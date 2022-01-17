function(index){
		if (repeatmodel[index-1].First.value !== ""){ // TODO: figure out why we are getting called twice for each click
			var insert = mvc.newStatefulModel({ "data" : {
			"First"   : "",
			"Last"    : "",
			"Location": "CA",
			"Office"  : "",
			"Email"   : "",
			"Tel"     : "",
			"Fax"     : ""} 
			});
			repeatmodel.add(index, insert);
			setDetailsContext(index);
			nextIndexToAdd++;
		}else{
			setDetailsContext(index-1);                 
		}
	}