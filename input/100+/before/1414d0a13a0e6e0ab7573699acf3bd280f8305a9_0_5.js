function (e) {
				
					var files = Array.from(e.target.files), op = Object[append]({}, options, {hideDialog: true}), transfer;
					
					this.load(files.shift());
					
					files.each(function (f) { 
					
						transfer = uploadManager.upload(Object[append]({}, op));
						if(transfer) transfer.load(f)
					})
					
				}