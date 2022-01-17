function () {
			var name = this.cache.get('.name').val(),
				email = this.cache.get('.email').val(),
				message = this.cache.get('.message').val(),
				errors = '',
				valid = true;

			if (name === '') {
				errors = ('Please enter your name.<br>');
				valid = false;
			}
			if (email === '' || email.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) === -1) {
				errors += ('Please enter a valid email address.<br>');
				valid = false;
			}
			if (message === '') {
				errors += ('Please enter a message.');
				valid = false;
			}
			if (!valid) {
				this.reportStatus(errors);
			}

			return valid;
		}