function(v){
						var obj = c.make('entity', {value: 'test'})
						_.assertDefined(obj)
						v.s.add(obj)
					}