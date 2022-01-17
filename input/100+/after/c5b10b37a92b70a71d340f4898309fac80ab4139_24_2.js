function(config, done){
	minnow.makeServer(config, function(){
		minnow.makeClient(config.port, function(client){
			client.view('general', function(c){
			
				poll(function(){
					if(c.has('primitiveList') && c.primitiveList.data.size() === 2){
						var arr = c.primitiveList.data.toJson()
						if(arr[0] === 'a' && arr[1] === 'c'){
							done()
							return true
						}
					}
				})

				minnow.makeClient(config.port, function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.make('stringList')
						v.setProperty('primitiveList', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						obj.data.push('a')
						obj.data.push('b')
						obj.data.push('c')
						
						obj.data.remove('b')
					})
				})
				
			})
			})
		})
}