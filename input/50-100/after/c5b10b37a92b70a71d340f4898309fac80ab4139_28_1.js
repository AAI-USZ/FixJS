function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.make('entity')
						v.setProperty('s', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						obj.data.add('test')
					})
				}