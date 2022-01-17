function(e){
		console.log('got uncaught exception')
		//throw new Error(e)
		currentFail(e)
	}