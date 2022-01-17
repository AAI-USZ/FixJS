function(options) {

				//file type filter
				if(options.filetype) this[addEvent]('load',	function (object) { 
					
					var matches = options.filetype.split(/[^a-z0-9]/i); 
						
					if(!this.aborted && matches.length > 0) this.aborted = !new RegExp('(\.' + matches.join(')$|(\.') + '$)', 'i').test(object.file);
					if(this.aborted) this.message = Locale[get]('uploadManager.UNAUTHORIZED_FILE_TYPE')
				});
					
				var element, container = options.container;
					
				this[addEvents]({
		
						abort: function () { this.state = 2 },
						load: function () { uploadManager.actives[container].push(this) },
						success: function (json) {
								
							this.state = 4;
							this.filesize = json.size;
							this.complete = true;
							uploadManager.actives[container].erase(this);
							
							//ultimate file size limit check
							if(options.maxsize > 0) {
								
								var size = 0;
								
								uploadManager.getTransfers(options.container).each(function (transfer) { if(transfer.state == 4) size += transfer.size});
								
								if(size > options.maxsize) {
								
									this.message = Locale[get]('uploadManager.TOTAL_FILES_SIZE_EXCEEDED', options.maxsize[toFileSize]());
									this.cancel()
								}
							}
							
							var id = options.id;
							
							$(id + '_lfile').set({checked: true, value: json.path, disabled: false});
							$(id).set({value: json.file, disabled: false })
						},
						cancel: function () {  
						
							this.state = 3;
							uploadManager.uploads[container].erase(this);
							uploadManager.actives[container].erase(this)
						},
						complete: function () { 
						
							if(uploadManager.actives[container].length == 0 && uploadManager.queue[container].length == 0) {
							
								uploadManager.active = false;
								this[fireEvent]('allComplete', container) 
							}
							else if(uploadManager.enqueue) {
							
								uploadManager.active = Object.every(uploadManager.actives[container], function (upload) { return upload.state == 1 });
								uploadManager.load(container)							
							}
						}
					}).setOptions(options);
				
				element = this[createElement](options);
				
				this.checkbox = element[getElement]('#' + options.id).store(transport, this);			
				element[getElement]('a.cancel-upload')[addEvent]("click", function(e) { 
						
					e.stop(); 
					this.cancel() 
					
				}.bind(this));
				this[fireEvent]('create', this)
			}