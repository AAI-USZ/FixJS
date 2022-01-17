function(s){
								minnow.makeClient(config.port, function(c){
									c.view('general', [], function(handle){
										if(handle.objects.size() !== 1) throw new Error('persistence failure: ' + handle.objects.size())
										done()
									})
								})
							}