function(notify) {
		// close out import and reset object for the next import
		var _this = this;

		if(arguments.length == 0) {
			var notify = true; //default notifications to true
		}

		var desktopNotifyAllowed = FDGS.settings.notificationsAmazonEnabledDesktop;
		var emailNotifyAllowed = FDGS.settings.notificationsAmazonEnabledEmail;

		// first send import success notification (if new quotes were imported)
 	    FDGS.settings.updateLastImportDate();
 	    if(notify && desktopNotifyAllowed) {
 	    	if(_this.importedAsins.length > 0) {
 	    		FDGS.amazonLastImportData = _this.completedImportInfo;
 	    		FDGS.amazonLastImportTotal = _this.highlightTotal;
 	    	}

 	    	if(_this.importedAsins.length == 0 && FDGS.settings.isDev) {
	 	    	FDGS.showNotification(_this.notification_templates.importEmpty);
 	    	} else if (_this.completedImportInfo.length > 0) {
	 	    	FDGS.showNotification(_this.notification_templates.importSuccess);
 	    	}
 	    }

 	    // the email notification may be something that should happen on the server
 	    // but I'll put it in here for now.
 	    if(notify && emailNotifyAllowed) {
 	    	if(_this.importedAsins.length > 0) { //only send the email if highlights were found
	 	    	$.getJSON(_this.importNotificationEmailURL, function(result) {
	 	    		if(result.success) {
	 	    			FDGS.log("Import notification email sent!");
	 	    		} else {
	 	    			FDGS.log("Notification email send FAILED.");
	 	    		}
	 	    	});
 	    	}
 	    }

		// now reset the object 
	    _this.processing = false;
		_this.content = {};
		_this.upcomingAsins = [];
		_this.importedAsins = [];
		_this.processedAsins = [];
		_this.completedImportInfo = [];
		_this.importData = [];
	    _this.currentBook = {"asin": "", "coverImg": "", "processing": false, "init": function(asin) {this.asin = asin; this.coverImg=""; this.processing=false; }};
	    _this.highlightTotal = 0;
	    _this.importKey = -1;

		chrome.browserAction.setIcon({"path": "icon-16x16.png"});

		// reset the last import data
	    FDGS.log("Import process closed.  Over and out. [" + FDGS.settings.lastImportDate + "]");
	}