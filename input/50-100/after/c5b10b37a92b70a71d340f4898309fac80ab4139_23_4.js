function(config, done){
	minnow.makeServer(config, function(s){
		minnow.makeClient(config.port, function(c){
			c.close(function(){
				s.close(function(){
					minnow.makeServer(config, function(s){
						done()
					})
				})
			})
		})
	})
}