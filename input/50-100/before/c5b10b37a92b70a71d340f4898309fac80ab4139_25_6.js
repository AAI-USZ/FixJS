function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.setPropertyToNew('s', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)

						var oldObj = obj.data.addNew({value: 'something'})
						
						var first = true
						v.onChange(function(){
							if(!first) return
							first = false
							var newObj = obj.data.replaceNew(oldObj, {value: 'something else'})
						})
					})
				}