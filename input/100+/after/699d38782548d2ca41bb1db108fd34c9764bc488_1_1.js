function() {
		// close out import and reset object for the next import
		var _this = this;
		var desktopNotifyAllowed = FDGS.settings.notificationsAmazonEnabledDesktop;
		FDGS.log("desktop notifications allowed? " + desktopNotifyAllowed);

		var emailNotifyAllowed = FDGS.settings.notificationsAmazonEnabledEmail;
		FDGS.log("email notifications allowed? " + emailNotifyAllowed);

		// first send import success notification (if new quotes were imported)
 	    FDGS.settings.updateLastImportDate();
 	    if(desktopNotifyAllowed) {
 	    	if(_this.statusDisplayQueue.length > 0) {
 	    		FDGS.amazonLastImportData = _this.statusDisplayQueue;
 	    	}

 	    	if(_this.statusDisplayQueue.length == 0) {
	 	    	FDGS.showNotification(_this.notification_templates.importEmpty);
 	    	} else if (_this.statusDisplayQueue.length > 0) {
	 	    	FDGS.showNotification(_this.notification_templates.importSuccess);
 	    	}
 	    }

 	    // the email notification may be something that should happen on the server
 	    // but I'll put it in here for now.
 	    if(emailNotifyAllowed) {
 	    	//send the email notification
 	    }

		// now reset the object 
	    _this.processing = false;
		_this.content = {};
		_this.upcomingAsins = [];
		_this.usedAsins = [];
		_this.processedAsins = [];
		_this.statusDisplayQueue = [];
		_this.importData = [];
	    _this.currentBook = {"asin": "", "coverImg": "", "processing": false, "init": function(asin) {this.asin = asin; this.coverImg=""; this.processing=false; }};
	    _this.highlightTotal = 0;
	    _this.importKey = -1;

		// reset the last import data
		FDGS.amazonLastImportData = null,
	    FDGS.log("Import process closed.  Over and out. [" + FDGS.settings.lastImportDate + "]");
	}