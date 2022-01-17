function(data, status, xhr) {
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