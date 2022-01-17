function(){
					if(c.has('s') && c.s.size() === 1){
						_.assertEqual(c.s.keys()[0], 'blah');
						_.assertEqual(c.s.value('blah'), 'vblah')
						done()
					}
				}