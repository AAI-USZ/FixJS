function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.make('obj')
						v.setProperty('s', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)

						var oldObj = obj.data.addNew({value: 'something'})
						
						var newObj = v.make('entity', {value: 'something else'})
						obj.data.replaceExisting(oldObj, newObj)
					})
				}