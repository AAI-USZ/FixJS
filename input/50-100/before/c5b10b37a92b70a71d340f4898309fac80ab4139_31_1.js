function(){
					if(c.has('s') && c.s.size() === 1){
						var d;
						c.s.each(function(dd){d = dd;})
						if(d.value.value() === 'test'){
							done()
						}
					}
				}