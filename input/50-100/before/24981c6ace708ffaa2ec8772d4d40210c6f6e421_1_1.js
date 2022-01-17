function(page) {
							var path = page.getPath(); // Let this line at this position!!
							page.saveMetadata(pageData, this.options.language, $.proxy(function() {
								page.lock(this.options.runtime.getUserLogin(), function() {
									location.href = path + window.currentLanguage + "?edit&_=" + new Date().getTime();
								});
							}, this));
						}