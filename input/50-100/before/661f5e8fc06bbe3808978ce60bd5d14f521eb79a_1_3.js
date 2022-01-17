function (value) {
					
						if(progress && progress.setValue) progress.setValue(value);
						
						if(value == 1) {
							
							field[getElement]('label')[set]({text: file.name.shorten() + ' (' + this.size[toFileSize]() + ')', title: file.name});
							field.style.display = ''
						}
					}