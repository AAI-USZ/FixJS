function(options) {
			
				var opt = Object[append]({limit: 0, filesize: 0, maxsize: 0, progressbar: true/*, resume: false, iframe: false */}, options),
					container = opt.container,
					transfer;
				
				if(!this.uploads[container]) {
				
					this.actives[container] = [];
					this.uploads[container] = []
				}
				
				//restrict number of uploaded files
				if(opt.limit > 0 && this.uploads[container].length >= opt.limit) return undef;
				
				if(opt.limit != 1 && !opt.name.test(/^\[\]$/)) opt.name += '[]';
				
				//where to send the uploaded file
				opt.base = opt.base || 'upload.php';
				opt.id =  opt.name.replace(/[^a-z0-9]/gi, '') + Date.now();
				
				if(opt.iframe || !this.xmlhttpupload) transfer = new Transfert(opt);
				
				//opera does not yet support chunck file upload
				else if(this.resume && !Browser.opera) transfer = new HTML5MultipartTransfert(opt);
				else transfer = new HTML5Transfert(opt);
			
				this.uploads[container].push(transfer);
			
				return transfer
			}