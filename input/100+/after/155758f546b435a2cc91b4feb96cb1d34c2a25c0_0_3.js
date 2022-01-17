function(data, status, xhr) {
						form.removeClass('changed'); // TODO This should be using the plugin API
						if(callback) callback(data, status, xhr);

						var newContentEls = self.handleAjaxResponse(data, status, xhr);
						if(!newContentEls) return;

						newContentEls.filter('form').trigger('aftersubmitform', {status: status, xhr: xhr, formData: formData});
					}