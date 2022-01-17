function () {
			$.ui.dialog.prototype._init.apply(this, arguments);
			var self = this;
			
			//refresh button part {
			var refreshHtml = '<a href="#" class="ui-dialog-titlebar-refresh ui-corner-all" role="button" style="display: none;">'
				+ '<span class="ui-icon ui-icon-refresh">refresh</span>'
				+ '</a>';
			this.refreshButton = $(refreshHtml)
				.appendTo(this.uiDialogTitlebar)
				.click(function(){
					self.refreshUrl();
					return false;
				});
			// } refresh button part 

			//share button part {
			var shareHtml = '<a href="#" class="ui-dialog-titlebar-share ui-corner-all" role="button" style="display: none;">'
				+ '<span class="ui-icon ui-icon-signal-diag">share</span>'
				+ '</a>';
			this.shareButton = $(shareHtml)
				.appendTo(this.uiDialogTitlebar)
				.click(function(){
					self.shareUrl();
					return false;
				});
			// } share button part 
			
			// { Minimize button part
			var minimizeHtml = '<a href="#" class="ui-dialog-titlebar-minimize ui-corner-all" role="button">'
				+ '<span class="ui-icon ui-icon-minus">minimize</span>'
				+ '</a>';
			$(minimizeHtml)
				.appendTo(this.uiDialogTitlebar)
				.click(function(){
					self.switchMinimize();
					return false;
				});
			// } Minimize button part
		}