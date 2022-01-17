function(){
		minnow.makeClient(port, function(c){
			c.view('general', [], function(handle){
				done()
			})
		})
	}