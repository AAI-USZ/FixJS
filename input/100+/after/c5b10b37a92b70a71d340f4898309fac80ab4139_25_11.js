function(config, done){
	minnow.makeServer(config, function(){
		minnow.makeClient(config.port, function(client){
			client.view('general', function(c){
			
				poll(function(){
					if(c.has('s') && c.s.data.size() === 1){
						var d = c.s.data.at(0)
						if(d.value.value() === 'something else'){
							done()
							return true
						}
					}
				})

				minnow.makeClient(config.port, function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.make('obj')
						v.setProperty('s', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)

						var oldObj = obj.data.addNew({value: 'something'})
						
						var newObj = v.make('entity', {value: 'something else'})
						obj.data.replaceExisting(oldObj, newObj)
					})
				})
				
			})
		})
	})
}