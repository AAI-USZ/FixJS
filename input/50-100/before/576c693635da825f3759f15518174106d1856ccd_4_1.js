function( args, callback ){ 
	//console.log(args.question_uid)	
	queryES.getQuestion(args.question_uid, 0, function(result){
		if (result) {
			callback(null, result);
		}
		else {
			var error = "No result."
			callback(error, null);
		}
	});	
}