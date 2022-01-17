function(e) {
				var urlField = this.getURLField();

				if (urlField.validate()) {
					var form = this.closest('form');
					form.showFileView('http://' + urlField.val());
					form.redraw();
				}

				return false;
			}