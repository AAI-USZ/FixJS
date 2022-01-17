function (e) {
			
						var loaded = false,
							options = Object[append]({}, self._options, {hideDialog: true}),
							transfer;
							
						Array.each(input.files, function (f) { 

							if(f.name == '.' || f.name == '..') return;
							else if(!loaded) {
							
								self.load(f);
								loaded = true
							}
							else {
								
								transfer = uploadManager.upload(Object[append]({}, options));
								if(transfer) transfer.load(f)
							}
						})
					}