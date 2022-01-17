function(v){
						var obj = v.setPropertyToNew('s', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)

						var oldObj = obj.data.addNew({value: 'something'})
						
						var first = true
						v.onChange(function(){
							if(!first) return
							first = false
							var newObj = v.make('entity', {value: 'something else'})
							console.log('newObj id: ' + newObj.id())
							obj.data.replaceExisting(oldObj, newObj)
						})
					}