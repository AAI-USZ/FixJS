function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(s){
		minnow.makeClient(port, function(c){
			c.view('general', [], function(handle){
				handle.make('entity', {name: 'test name'}, function(id){
					c.view('specific', [id], function(handle){
						if(handle.object.name.value() === 'test name'){
							done()
						}
					})
				})
			})
		})
	})
}