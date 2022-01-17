function(e) {
		this.buttonLog("get", "Getting your colors from the server...");
		
		var that = this;
		vestitools_style.getColors(GM_getValue("username", "unknown"), function(xhr, success, styles) {
			vestitools_style.defaultGetColorsCallback(xhr, success, styles);
			
			var msg = "Personal colors successfully found and saved.";
			if(!success) {
				if(xhr.responseText == "null" || xhr.responseText == "false") {
					msg = "No personal colors found on the server (" + xhr.responseText + "), using defaults.";
					}
				else {
					msg = that.XHRErrorMessage(xhr);
					}
				}
			
			that.buttonLog("get", msg);
			if(success) {
				that.setStylesInput(styles);
				}
			});
		}