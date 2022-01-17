function(e) {
		var styles = this.getStylesInput();
		var username = GM_getValue("username", "unknown");
		
		this.buttonLog("post", "Posting colors to the server...");
		
		//this will handle validation of styles as well
		var that = this;
		vestitools_style.postColors(username, styles, function(xhr, success, username, styles) {
				that.buttonLog("post", success ? "Personal colors successfully posted and saved." : that.XHRErrorMessage(xhr));
				vestitools_style.defaultPostColorsCallback(xhr, success, username, styles);
				//set the inputs to the now-validated values
				if(success) {
					that.setStylesInput(styles);
					}
				});
		
		
		}