function(config, done){
	minnow.makeServer(config, function(s){
		minnow.makeClient(config.port, function(c){
			c.view('general', [], function(handle){
				handle.make('entity', {name: 'test name'})
				c.close(function(){
					s.close(function(){
						console.log('persist test reloading server')
						minnow.makeServer(config, function(s){
							minnow.makeClient(config.port, function(c){
								c.view('general', [], function(handle){
									if(handle.objects.size() !== 1) throw new Error('persistence failure: ' + handle.objects.size())
									done()
								})
							})
						})
					})
				})
			})
		})
	})
}