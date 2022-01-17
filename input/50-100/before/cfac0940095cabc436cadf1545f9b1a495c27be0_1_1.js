function(input, callback) {
					
						var host = input.host.value || input.host.placeholder
						
						var port = input.port.value || input.port.placeholder
					
						if ( host !== input.host.placeholder || port !== input.port.placeholder ) {
						
							self.set('host', host)
							
							self.set('port', port)
						
							location.reload() 
						}
					}