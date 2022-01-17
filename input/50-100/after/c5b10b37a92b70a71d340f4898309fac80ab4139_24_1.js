function(otherClient){
					otherClient.view('general', function(v){
						var n = v.make('stringList')
						v.setProperty('primitiveList', n)
						_.assertDefined(n)
						_.assertDefined(n.data)
						n.data.push('test')
					})
				}