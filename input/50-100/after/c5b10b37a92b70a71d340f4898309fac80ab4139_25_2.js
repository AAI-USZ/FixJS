function(){
					if(c.has('s') && c.s.data.size() === 1){
						var d = c.s.data.at(0)
						if(d.value.value() === 'something'){
							done()
							return true
						}
					}
				}