function() {
				this.bind('change.TreeDropdownField', function() {
					$(this).getField().updateTitle();
				});
			}