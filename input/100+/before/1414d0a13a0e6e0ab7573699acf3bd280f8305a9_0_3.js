function (e) {
			
				e.stop();
				
				var el = this, 
					options = Object[append]({}, 
					el.retrieve(store), {hideDialog: true}), 
					upload = function (f) { 
				
						// webkit upload folder
						// http://wiki.whatwg.org/wiki/DragAndDropEntries						
						if(getAsEntry == undef && !['getAsEntry', 'webkitGetAsEntry', 'mozGetAsEntry', 'oGetAsEntry', 'msGetAsEntry'].some(function (method) {
						
							if(f[method]) getAsEntry = method;
							
							return getAsEntry
						})) getAsEntry = '';
						
						if(getAsEntry && f[getAsEntry]) f = f[getAsEntry]();
						
						if(f.isDirectory) f.createReader().readEntries(function(entries) { Array.each(entries, upload) });
						else if(f.isFile) f.file(upload, function () { /* console.log('Error! ', arguments) */ });
						else {
							
							transfer = uploadManager.upload(Object[append]({}, options));
							if(transfer) transfer.load(f)
						}
					},
					dataTransfer = e.event.dataTransfer,
					transfer;

				el.getFirst().style.display = 'none';
				
				if(dataTransfer) Array.each(dataTransfer.items || dataTransfer.files, upload)
			}