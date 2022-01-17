function () {
			
				var xhr = this.xhr;
				
				this.running = true;
				this[element][getElement]('.resume-upload').style.display = 'none';
				
				xhr.open('POST', this.options.base, true);
				xhr.setRequestHeader('Size', this.size);
				xhr.setRequestHeader('Filename', this.filename);
				xhr.setRequestHeader('Sender', 'XMLHttpRequest');
				
				//FF
				if(this.binary) xhr.sendAsBinary(this.bin);
				else xhr.send(this.file)
			}