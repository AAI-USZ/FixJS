function (file) {
					
						this.blocks = {};
						this.uploads = {};
						this.parts = Math.ceil(file.size / this.options.chunckSize);
						
						for(var i = 0; i < this.parts; i++) this.blocks[i] = 1
					}