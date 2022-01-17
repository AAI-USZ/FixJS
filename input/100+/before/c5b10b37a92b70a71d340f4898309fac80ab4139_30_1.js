function(client){
			client.view('general', function(c){
			
				c.onChange(function(){
					if(c.has('s') && c.s.size() === 1){
						_.assertEqual(c.s.keys()[0], 'blah');
						_.assertEqual(c.s.value('blah'), 'vblah')
						done()
					}
				})

				minnow.makeClient(port, function(otherClient){
					otherClient.view('general', function(v){
						v.makeObjectFromJson('entity', {key: 'blah', value: 'vblah'})
					})
				})
			})
		}