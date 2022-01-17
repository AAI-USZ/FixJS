function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(){
		minnow.makeClient(port, function(client){
			client.view('general', function(c){
			
				c.onChange(function(){
					if(c.has('s') && c.s.size() === 1){
						var d;
						c.s.each(function(dd){d = dd;})
						if(d.value.value() === 'test'){
							done()
						}
					}
				})

				minnow.makeClient(port, function(otherClient){
					otherClient.view('general', function(v){
						var obj = c.make('entity', {value: 'test'})
						_.assertDefined(obj)
						v.s.add(obj)
					})
				})
				
			})
		})
	})
}