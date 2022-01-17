function() {

							if(xhr.readyState == 0) {
							
								this.pause();
								return
							}
							
							var status, json, event = 'success';
							
							try { status = xhr.status } catch(e) {  }
							
							//success
							if (status >= 200 && status < 300) {
							
								try { 
								
									json = JSON.decode(xhr.responseText);
									
									if(json.remove) this.remove = json.remove;
									
									if(upload.blob.size > json.size) {
									
										if(json.success) {
											
											//load next
											delete this.uploads[index].xhr;
											this.initUpload(index)
										}
										
										else {
										
											//failure for some reason
											this.message = Locale[get]('uploadManager.FILE_CORRUPTED');
											this.failure()
										}
									}		
						
									else {
																			
										json.transfer = this;
										json[element] = this[element];
										if(json.message) this.message = json.message;
										
										if(json.success) {
										
											upload.loaded = json.size;
											
											if(json.size == upload.blob.size) {
												
												this.active--;
												this.loaded += json.size;
												
												delete this.blocks[index]
												delete this.uploads[index];
											}
											
											this.compute();
											if(this.size > this.loaded) this[upload]();
											else if(this.size == this.loaded) {
												
												var self = this[fireEvent]('progress', 1),
													options = this.options;
														
												json.size = this.size;
												this[fireEvent]('success', json)[fireEvent]('complete', this)
											}
										}
									}
								}			
										
								catch(e) { }
							}
							
						}