function(input){

		this.modern = true;

		var form = input.getParent('form');
		if (!form) return;

		var self = this;

		var drop = new Element('div.droppable', {
			text: this.options.dropMsg
		}).inject(input, 'after');

		var list = new Element('ul.uploadList').inject(drop, 'after');

		var progress = new Element('div.progress')
			.setStyle('display', 'none').inject(list, 'after');

		var  inputFiles = new Form.MultipleFileInput(input, list, drop, {
			onDragenter: drop.addClass.pass('hover', drop),
			onDragleave: drop.removeClass.pass('hover', drop),
			onDrop: function(){
				drop.removeClass.pass('hover', drop);
				if (self.options.fireAtOnce){
					form.fireEvent("submit");
				}
			}
		});

		var uploadReq = new Request.File({
			url: form.get('action'),
			onRequest: progress.setStyles.pass({display: 'block', width: 0}, progress),
			onProgress: function(event){
				var loaded = event.loaded, total = event.total;
				progress.setStyle('width', parseInt(loaded / total * 100, 10).limit(0, 100) + '%');
			},
			onComplete: function(){
				progress.setStyle('width', '100%');
				self.fireEvent('complete', Array.slice(arguments));
				this.reset();
			}
		});

		var inputname = input.get('name');

		form.addEvent('submit', function(event){
			if (event) event.preventDefault();
			inputFiles.getFiles().each(function(file){
				uploadReq.append(inputname , file);
			});
			uploadReq.send();
		});

		self.reset = function() {
			var files = inputFiles.getFiles();
			for (var i = 0; i < files.length; i++){
				inputFiles.remove(files[i]);
			}
		};
	}