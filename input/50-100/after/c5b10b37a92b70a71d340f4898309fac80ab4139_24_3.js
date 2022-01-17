function(v){
						var obj = v.make('stringList')
						v.setProperty('primitiveList', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						obj.data.push('a')
						obj.data.push('b')
						obj.data.push('c')
						
						obj.data.remove('b')
					}