function (file) {
				
				this.aborted = false;
				this[fireEvent]('load', {element: this.element, file: file.name, size: file.size, transfer: this});
				
				if(this.aborted) {
				
					this[fireEvent]('abort', {file: file, message: this.message || '', transfer: this});
					delete this.message;
					this.cancel();
					return this
				}
				
				this.file = file;
				this.size = file.size;
				this.filename = file.name;
				
				var first = this.element.getFirst('.upload-progress'),
					span = first[getElement]('span')[setStyle]('display', 'none'),
					field = span.getNext()[setStyle]('display', 'none'),
					progress;
				
					this[addEvent]('progress', function (value) {
					
						if(progress && progress.setValue) progress.setValue(value);
						
						if(value == 1) {
							
							field[getElement]('label').set({text: this.filename.shorten() + ' (' + this.size[toFileSize]() + ')', title: this.filename});
							field.style.display = ''
						}
					});
					
				if(this.options.progressbar) progress = new ProgressBar(Object[append]({
						
						container: first.set('title', file.name),
						text: file.name.shorten()
						
					}, typeof this.options.progressbar == 'object' ? this.options.progressbar : {}))[addEvents]({
						change: function () {
					
							first.set('title', file.name + ' (' + (this.value * 100).format() + '%)')
						},
						onComplete: function () {
						
							progress = progress.toElement();
							progress.style.display = 'none';
							
							(function () { progress.destroy() }).delay(50)
						}
					});
					
				field.getFirst().style.display = 'none';
				
				this.element[getElement]('input[type=file]').destroy();	
				
				span.destroy();
				uploadManager.push(this.options.container, function () {
				
					this.state = 1;
					this.upload() 
				}.bind(this));
				
				if(this.reader) this.reader.readAsBinaryString(file);
				return this
			}