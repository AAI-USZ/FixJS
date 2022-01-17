function(config, done){
	minnow.makeServer(config, function(){
		minnow.makeClient(config.port, function(c){
			c.view('general', [], function(handle){
				done()
			})
		})
	})
}