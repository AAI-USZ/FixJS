function() {
			$.ui.dialog.prototype._setOption.apply(this, arguments);
			
			$(this.refreshButton).toggle(this.options.url !== null);
			$(this.shareButton).toggle(this.options.url !== null);
		}