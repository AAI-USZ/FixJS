function(){
							if(obj.data.size() === 1){
								var d;
								obj.data.each(function(dd){d = dd;})
								d.value.set('something')
								return true
							}
						}