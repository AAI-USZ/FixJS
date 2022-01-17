function() {
		var form = document.id('adminForm');
	
		if (this.busy) {
			return false;
		}

		var req = new Request.JSON({
			method: 'post',
			url: this.baseUrl,
			onRequest: function() {
				this.spinner.show(true);
				this.busy = true;
				Joomla.removeMessages();
			}.bind(this),
			onSuccess: function(r) {
				Joomla.replaceTokens(r.token);
				if (r.messages) {
					Joomla.renderMessages(r.messages);
				}
				var lang = $$('html').getProperty('lang')[0];
				if (lang.toLowerCase() === r.lang.toLowerCase()) {
					Install.goToPage(r.data.view, true);
				} else {
					window.location = this.baseUrl+'?view='+r.data.view;
				}
			}.bind(this),
			onFailure: function(xhr) {
				this.spinner.hide(true);
				this.busy = false;
				var r = JSON.decode(xhr.responseText);
				if (r) {
					Joomla.replaceTokens(r.token);
					alert(r.message);
				}
			}.bind(this)
		});
		req.post(form.toQueryString()+'&task='+form.task.value+'&format=json');

		return false;
	}