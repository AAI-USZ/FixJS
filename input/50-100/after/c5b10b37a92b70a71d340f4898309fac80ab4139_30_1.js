function(){
					if(c.s.size() === 1){
						console.log(JSON.stringify(c.s.toJson()))
						_.assertEqual(c.s.keys()[0], 'blah');
						_.assertEqual(c.s.value('blah'), 'vblah')
						done()
						return true
					}
				}