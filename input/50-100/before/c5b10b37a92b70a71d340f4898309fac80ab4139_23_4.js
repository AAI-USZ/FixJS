function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(s){
		minnow.makeClient(port, function(c){
			c.close(function(){
				s.close(function(){
					minnow.makeServer(dir, serverDir, port, function(s){
						done()
					})
				})
			})
		})
	})
}