function(ajaxOpts, successCallback) {
			var self = this, form = this.closest('form'), 
				focusedElName = this.find(':input:focus').attr('name'), // Save focused element for restoring after refresh
				data = form.find(':input').serializeArray();

			if(!ajaxOpts) ajaxOpts = {};
			if(!ajaxOpts.data) ajaxOpts.data = [];
			ajaxOpts.data = ajaxOpts.data.concat(data);

			// Include any GET parameters from the current URL, as the view state might depend on it.
			// For example, a list prefiltered through external search criteria might be passed to GridField.
			if(window.location.search) {
				ajaxOpts.data = window.location.search.replace(/^\?/, '') + '&' + $.param(ajaxOpts.data);
			}

			form.addClass('loading');

			$.ajax($.extend({}, {
				headers: {"X-Pjax" : 'CurrentField'},
				type: "POST",
				url: this.data('url'),
				dataType: 'html',
				success: function(data) {
					// Replace the grid field with response, not the form.
					// TODO Only replaces all its children, to avoid replacing the current scope
					// of the executing method. Means that it doesn't retrigger the onmatch() on the main container.
					self.empty().append($(data).children());

					// Refocus previously focused element. Useful e.g. for finding+adding
					// multiple relationships via keyboard.
					if(focusedElName) self.find(':input[name="' + focusedElName + '"]').focus();

					form.removeClass('loading');
					if(successCallback) successCallback.apply(this, arguments);
					self.trigger('reload', self);
				},
				error: function(e) {
					alert(ss.i18n._t('GRIDFIELD.ERRORINTRANSACTION'));
					form.removeClass('loading');
				}
			}, ajaxOpts));
		}