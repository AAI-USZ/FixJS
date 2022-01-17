function(){
		minnow.makeClient(port, function(c){
			c.view('general', [], function(handle){
				c.view('general', [], function(otherHandle){
					if(handle !== otherHandle) throw new Error('a request for the same view with same parameters should return the same handle')
					done()
				})
			})
		})
	}