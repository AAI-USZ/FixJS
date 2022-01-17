function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(){
		minnow.makeClient(port, function(client){
			client.view('general', function(c){
			
				c.onChange(function(){
					if(c.has('s') && c.s.data.size() === 1){
						var d;
						c.s.data.each(function(dd){d = dd;})
						if(d.value.value() === 'something else'){
							done()
						}
					}
				})

				minnow.makeClient(port, function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.setPropertyToNew('s', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)

						var oldObj = obj.data.addNew({value: 'something'})
						
						var first = true
						v.onChange(function(){
							if(!first) return
							first = false
							var newObj = v.make('entity', {value: 'something else'})
							console.log('newObj id: ' + newObj.id())
							obj.data.replaceExisting(oldObj, newObj)
						})
					})
				})
				
			})
		})
	})
}