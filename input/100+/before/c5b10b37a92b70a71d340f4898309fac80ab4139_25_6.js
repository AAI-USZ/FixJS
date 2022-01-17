function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.setPropertyToNew('s', true)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						var newObj = obj.data.addNew()
						
						obj.data.replaceNew(newObj, {value: 'something else'})
						
						v.onChange(function(){
							if(obj.data.size() === 1){
								var d;
								obj.data.each(function(dd){d = dd;})
								d.value.set('something')
							}
						})
					})
				}