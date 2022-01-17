function(form, button, callback, ajaxOptions) {
				var self = this;
		  
				// look for save button
				if(!button) button = this.find('.Actions :submit[name=action_save]');
				// default to first button if none given - simulates browser behaviour
				if(!button) button = this.find('.Actions :submit:first');
	
				form.trigger('beforesubmitform');
				this.trigger('submitform', {form: form, button: button});
	
				// set button to "submitting" state
				$(button).addClass('loading');
	
				// validate if required
				if(!form.validate()) {
					// TODO Automatically switch to the tab/position of the first error
					statusMessage("Validation failed.", "bad");

					$(button).removeClass('loading');

					return false;
				}
				
				// save tab selections in order to reconstruct them later
				var selectedTabs = [];
				form.find('.cms-tabset').each(function(i, el) {
					if($(el).attr('id')) selectedTabs.push({id:$(el).attr('id'), selected:$(el).tabs('option', 'selected')});
				});

				// get all data from the form
				var formData = form.serializeArray();
				// add button action
				formData.push({name: $(button).attr('name'), value:'1'});
				// Artificial HTTP referer, IE doesn't submit them via ajax. 
				// Also rewrites anchors to their page counterparts, which is important
				// as automatic browser ajax response redirects seem to discard the hash/fragment.
				formData.push({name: 'BackURL', value:History.getPageUrl()});

				// Standard Pjax behaviour is to replace the submitted form with new content.
				// The returned view isn't always decided upon when the request
				// is fired, so the server might decide to change it based on its own logic,
				// sending back different `X-Pjax` headers and content
				jQuery.ajax(jQuery.extend({
					headers: {"X-Pjax" : "CurrentForm,Breadcrumbs"},
					url: form.attr('action'), 
					data: formData,
					type: 'POST',
					complete: function() {
						$(button).removeClass('loading');
					},
					success: function(data, status, xhr) {
						form.removeClass('changed'); // TODO This should be using the plugin API
						if(callback) callback(data, status, xhr);

						var newContentEls = self.handleAjaxResponse(data, status, xhr);
						if(!newContentEls) return;

						var newForm = newContentEls.filter('form');

						// Re-init tabs (in case the form tag itself is a tabset)
						if(newForm.hasClass('cms-tabset')) newForm.removeClass('cms-tabset').addClass('cms-tabset');

						// re-select previously saved tabs
						$.each(selectedTabs, function(i, selectedTab) {
							newForm.find('#' + selectedTab.id).tabs('select', selectedTab.selected);
						});

						newForm.trigger('aftersubmitform', {status: status, xhr: xhr, formData: formData});
					}
				}, ajaxOptions));
	
				return false;
			}