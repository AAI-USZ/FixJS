function (json) {
								
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
							
							var id = options.id,
								file = $(id + '_lfile')[set]({checked: true, value: json.path, disabled: false}),
								change = function () { file.checked = this.checked },
								checkbox = $(id)[set]({
										value: json.file,
										disabled: false,
										events: {
											
											change: change,
											click: change
										}
									});
									
								checkbox.style.display = '';
								checkbox.checked = true
						}