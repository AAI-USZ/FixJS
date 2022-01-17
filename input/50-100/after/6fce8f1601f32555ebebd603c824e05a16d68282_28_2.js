function onAjaxError(jqXhr, ajaxStatus, ajaxError) {
			var error = {
				httpStatus: (jqXhr) ? jqXhr.status : null,
				ajaxStatus: ajaxStatus,
				message: (ajaxError !== '') ? ajaxError : 'Ajax connection error',
				url: self.settings.url,
				settings: ajaxOptions
			};
			self.errorReceived.dispatch(error);
		}