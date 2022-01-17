function () {

				if(this.paused) return;
				
				var i, offset, chunckSize = this.options.chunckSize;
				
				if(!this.guid) {
                                    
					this.createGuid();
					return
				}
				
				for(i in this.blocks) {
						
					if(this.active == this.options.chunks) break;
					
					if(!this.uploads[i]) {
						
						offset = Math.min(this.size, i * chunckSize);
						this.uploads[i] = {

							loaded: 0,
							offset: offset,
							blob: this.file[method](offset, chunckSize + (!brokenSlice ? offset : 0))
						}
					}
					else this.active++;
					
					this.initUpload(i)
				}
			}