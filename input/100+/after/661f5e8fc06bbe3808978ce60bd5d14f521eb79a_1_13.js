function () {
					
							var status, json;
							try { status = xhr.status } catch(e) {}
							
							//success
							if (status >= 200 && status < 300) {
							
								try { 
								
									json = JSON[decode](xhr[responseText]);
									
									//failed for some reasons
									if(!json.success) {
										
										this.message = Locale[get]('uploadManager.PREFETCH_FAILED');
										this.failure();
										return
									}
									
									this.guid = json.guid;
									this.element[getElement]('input[name^=guid_]').value = json.guid;
									this.upload()
								}					
								catch(e) { 
								
									this.message = Locale[get]('uploadManager.PREFETCH_FAILED');
									this.failure()
								}
							}
						}