function(s){
							minnow.makeClient(port, function(c){
								c.view('general', [], function(handle){
									if(handle.objects.size() !== 1) throw new Error('persistence failure: ' + handle.objects.size())
									done()
								})
							})
						}