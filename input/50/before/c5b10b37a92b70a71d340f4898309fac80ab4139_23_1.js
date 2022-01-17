function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(){
		minnow.makeClient(port, function(c){
			done()
		})
	})
}