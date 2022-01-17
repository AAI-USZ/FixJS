function(config, done){
	minnow.makeServer(config, function(){
		console.log('made server')
		minnow.makeClient(config.port, function(c){
			done()
		})
	})
}