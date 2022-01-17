function(){
					console.log(c.has('s'))
					if(c.has('s') && c.s.data.size() === 1){
						done()
						return true
					}
				}