function processError(ajaxError) {
			this.errorThrown.dispatch(ajaxError);
			updateFinished.dispatch(false, ajaxError);
		}