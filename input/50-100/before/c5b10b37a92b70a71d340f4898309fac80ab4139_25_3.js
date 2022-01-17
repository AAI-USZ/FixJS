function(){
					if(c.has('s') && c.s.data.size() === 1){
						var d;
						c.s.data.each(function(dd){d = dd;})
						if(d.value.value() === 'something'){
							done()
						}
					}
				}