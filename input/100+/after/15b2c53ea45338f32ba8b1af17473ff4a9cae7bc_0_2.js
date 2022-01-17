function( args, callback ){ 
	if ( args === null || args === undefined ){
		callback("Args is not existent", null);
		return;
	}
	var containsAllProperties = args.hasOwnProperty('question');
		
	if (  !containsAllProperties ){
		callback("Invalid args "+args.value, null );
		return;		
	}

	queryES.getQuestion(args.question, 0, function(result){
		if (result) {
			callback(null, result);
		}
		else {
			var error = "No result."
			callback(error, null);
		}
	});	
}