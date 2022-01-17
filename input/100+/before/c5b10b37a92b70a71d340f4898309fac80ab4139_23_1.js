function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(s){
		minnow.makeClient(port, function(c){
			c.view('general', [], function(handle){
				handle.make('entity', {name: 'test name'})
				setTimeout(function(){
				c.close(function(){
					s.close(function(){
						console.log('persist test reloading server')
							minnow.makeServer(dir, serverDir, port, function(s){
								minnow.makeClient(port, function(c){
									c.view('general', [], function(handle){
										if(handle.objects.size() !== 1) throw new Error('persistence failure: ' + handle.objects.size())
										done()
									})
								})
							})
					})
				})
				}, 250)
			})
		})
	})
}