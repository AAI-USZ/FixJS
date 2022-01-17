function(e) {
				var urlField = this.getURLField(), container = this.closest('.CompositeField'), form = this.closest('form');

				if (urlField.validate()) {
					container.addClass('loading');
					form.showFileView('http://' + urlField.val()).complete(function() {
						container.removeClass('loading');
					});
					form.redraw();
				}

				return false;
			}