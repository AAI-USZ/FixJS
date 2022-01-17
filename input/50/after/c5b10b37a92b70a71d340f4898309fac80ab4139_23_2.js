function(config, done){
	minnow.makeServer(config, function(s){
		s.close(function(){
			done()
		})
	})
}