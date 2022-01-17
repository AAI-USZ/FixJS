function(dir, serverDir, port, done){
	minnow.makeServer(dir, serverDir, port, function(){
		minnow.makeClient(port, function(client){
			client.view('general', function(c){
			
				c.onChange(function(){
					if(c.has('primitiveList') && c.primitiveList.data.size() === 1){
						done()
					}
				})

				minnow.makeClient(port, function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.setPropertyToNew('primitiveList', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						obj.data.push('test')
					})
				})
				
			})
		})
	})
}