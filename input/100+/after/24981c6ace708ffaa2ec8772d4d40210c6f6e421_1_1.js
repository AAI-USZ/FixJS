function() {
						if(this.parent == null) return;
						
						this.element.find("form#wbl-validate").submit();
						if(!this.element.find("form#wbl-validate").valid()) return;
						
						var url = this.element.find('input[name=url]').val();
						if(url != url.match(/[a-zA-Z0-9_-]*/)) {
							this.validator.showErrors({"url": jQuery.validator.messages.friendlyUrl});
							return;
						};
						
						$.each(this.element.find('form#wbl-validate :input'), function(i, input) {
							pageData[$(input).attr('name')] = $(input).val();
						});
						
						pageData.url = this.parent + pageData.url;
						
						// Create page and update pageData
						Page.create({path: pageData.url}, $.proxy(function(page) {
							this.destroy();
							var path = page.getPath(); // Let this line at this position!!
							page.saveMetadata(pageData, this.options.language, $.proxy(function() {
								page.lock(this.options.runtime.getUserLogin(), function() {
									location.href = path + window.currentLanguage + "?edit&_=" + new Date().getTime();
								});
							}, this));
						}, this), $.proxy(function(jqXHR, textStatus, errorThrown) {
							if(jqXHR.status == 409) {
								this.validator.showErrors({"url": 'Page already exists!'});
								return;
							} else {
								alert('Error creating page: ' + errorThrown);
								return;
							}
						}, this));
					}