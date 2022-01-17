function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(){
		minnow.makeClient(port, function(client){
			client.view('general', function(c){
			
				c.onChange(function(){
					if(c.has('s') && c.s.data.size() === 1){
						done()
					}
				})

				minnow.makeClient(port, function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.setPropertyToNew('s', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						obj.data.addNew()
					})
				})
				
			})
		})
	})
}