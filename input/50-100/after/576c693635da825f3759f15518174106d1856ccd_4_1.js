function( args, callback ){ 
	console.log(args.question)	
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