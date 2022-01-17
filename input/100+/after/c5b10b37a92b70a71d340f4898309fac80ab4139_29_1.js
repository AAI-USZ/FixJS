function(config, done){
	minnow.makeServer(config, function(s){
		minnow.makeClient(config.port, function(c){
			c.view('general', [], function(handle){
				handle.make('entity', {name: 'test name'}, function(id){
					console.log('GOT ID')
					c.view('specific', [id], function(handle){
						if(handle.object.name.value() === 'test name'){
							done()
						}else{
							console.log('single.getSpecificView - TEST FAILED: WRONG VALUE: ' + handle.object.name.value());
						}
					})
				})
			})
		})
	})
}