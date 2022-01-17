function(){
					console.log('polling: ' + JSON.stringify(c.toJson()) + ' ' + c.has('s'))
					if(c.has('s') && c.s.size() === 1){
						var d;
						console.log('got s to 1')
						c.s.each(function(dd){d = dd;})
						if(d.value.value() === 'test'){
							done()
							return true
						}
					}
				}