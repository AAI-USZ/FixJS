function (body) {
				callback.call(that, body);
				$this.find('#texterror').text('Error: ' + body).show();
			}