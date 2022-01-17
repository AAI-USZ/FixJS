function(data) {
					// Replace the grid field with response, not the form.
					// TODO Only replaces all its children, to avoid replacing the current scope
					// of the executing method. Means that it doesn't retrigger the onmatch() on the main container.
					self.empty().append($(data).children());

					// Refocus previously focused element. Useful e.g. for finding+adding
					// multiple relationships via keyboard.
					if(focusedElName) self.find(':input[name="' + focusedElName + '"]').focus();

					var content;
					if(ajaxOpts.data[0].filter=="show"){	
						content = '<span class="non-sortable"></span>';
						self.addClass('showFilter').find('.filter-header').show();														
					}else{
						content = '<button name="showFilter" class="ss-gridfield-button-filter" id="showFilter"></button>';
						self.removeClass('showFilter').find('.filter-header').hide();	
					}

					self.find('.sortable-header th:last').html(content);

					form.removeClass('loading');
					if(successCallback) successCallback.apply(this, arguments);
					self.trigger('reload', self);
				}