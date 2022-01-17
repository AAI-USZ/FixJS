function (e) {
			var self = this,
				data = {
					name: this.cache.get('.name').val(),
					email: this.cache.get('.email').val(),
					message: this.cache.get('.message').val()
				};
			
			e.preventDefault();
			if (self.validateForm()) {
				self.reportStatus('<img src="/images/activity-indicator.gif" alt="" /> Sending&hellip;');
				$.ajax({
					type: 'POST',
					url: '/contact',
					data: data,
					success: function (data) {
						self.clearForm();
						self.reportStatus('Thanks. Your message was sent.');
					},
					error: function (data) {
						self.reportStatusAndFadeOut('Oops. Something went wrong. Please try again.');
					}
				});
			}
		}