function(otherClient){
					otherClient.view('general', function(v){
						var obj = v.make('obj')
						v.setProperty('s', obj)
						_.assertDefined(obj)
						_.assertDefined(obj.data)
						var newObj = obj.data.addNew()
						
						obj.data.replaceNew(newObj, {value: 'something else'})
						
						poll(function(){
							if(obj.data.size() === 1){
								var d;
								obj.data.each(function(dd){d = dd;})
								d.value.set('something')
								return true
							}
						})
					})
				}