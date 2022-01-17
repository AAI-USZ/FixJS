function() {
			$.ui.dialog.prototype.close.apply(this, arguments);
			if (this.options.parent) {
				var parentDialog = $('#' + this.options.parent);
				if (parentDialog.length == 1) {
					parentDialog.dialog('refreshUrl');
				}
			}
		}