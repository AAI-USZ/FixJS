function() {

						if(xhr.status == 0) {
						
							this.element[getElement]('.resume-upload').style.display = '';
							return
						}
						
						var	self = this[fireEvent]('progress', 1),
							options = this.options;
								
						var status, json, event = 'success';
						this.running = false;
						
						try { status = xhr.status } catch(e) {}
						
						//success
						if (status >= 200 && status < 300) {
						
							try { 
							
								json = JSON[decode](xhr[responseText]);
								json.transfer = this;
								json.element = this.element;						
								if(json.size != this.size) event = 'failure'
							}					
							catch(e) { event = 'failure' }
							
						} else event = 'failure';
						
						this[fireEvent](event, event == 'failure' ? this : json)[fireEvent]('complete', this);

						if(json.size == 0) this.cancel(Locale[get]('uploadManager.EMPTY_FILE'));
						else if(options.filesize > 0 && json.size > options.filesize) this.cancel(Locale[get]('uploadManager.MAX_FILE_SIZE_EXCEEDED', options.filesize[toFileSize]()));
						else if(options.maxsize > 0 && uploadManager.getSize(options.container) > options.maxsize) this.cancel(Locale[get]('uploadManager.TOTAL_FILES_SIZE_EXCEEDED', options.maxsize[toFileSize]()))						
					}