function (e) {
			
				e.stop();
				
				var el = this, options = Object[append]({}, el.retrieve(store), {hideDialog: true}), transfer;

				el[getFirst]().style.display = 'none';
				if(e.event.dataTransfer) Array.from(e.event.dataTransfer.files).each(function (f) { 
				
						transfer = uploadManager[upload](Object[append]({}, options));
						if(transfer) transfer.load(f)
				})
			}