function(v){
						var obj = v.make('obj')
						v.setProperty('s', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)

						var oldObj = obj.data.addNew({value: 'something'})						
						var newObj = obj.data.replaceNew(oldObj, {value: 'something else'})
					}