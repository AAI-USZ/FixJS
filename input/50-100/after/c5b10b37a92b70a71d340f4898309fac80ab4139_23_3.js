function(config, done){
	minnow.makeServer(config, function(s){
		s.close(function(){
			minnow.makeServer(config, function(s){
				done()
			})
		})
	})
}