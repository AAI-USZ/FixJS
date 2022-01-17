function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(s){
		s.close(function(){
			done()
		})
	})
}