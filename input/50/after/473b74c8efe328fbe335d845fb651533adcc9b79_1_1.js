function(input) {
					
						if ( input.debug.checked != self.get('debug') ) {
						
							self.set('debug', input.debug.checked)
							
							location.reload(true)
						}
					}