function(v){
						var obj = v.setPropertyToNew('primitiveList', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						obj.data.push('test')
					}