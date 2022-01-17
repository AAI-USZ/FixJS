function (value) {
					
						if(progress && progress.setValue) progress.setValue(value);
						
						if(value == 1) {
							
							field[getElement]('label').set({text: this.filename.shorten() + ' (' + this.size[toFileSize]() + ')', title: this.filename});
							field.style.display = ''
						}
					}