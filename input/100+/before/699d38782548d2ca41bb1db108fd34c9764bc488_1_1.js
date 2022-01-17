function() {
		//reset for the next import
		var _this = this;

	    _this.processing = false;
		_this.content = {};
		_this.upcomingAsins = [];
		_this.usedAsins = [];
		_this.processedAsins = [];
		_this.statusDisplayQueue = [{"asin": "", "coverImg": "", "total": 0}];
		_this.importData = [];
	    _this.currentBook = {"asin": "", "coverImg": "", "processing": false, "init": function(asin) {this.asin = asin; this.coverImg=""; this.processing=false; }};
	    _this.highlightTotal = 0;
	    _this.importKey = -1;
	    FDGS.settings.updateLastImportDate();
	    FDGS.log("Import process closed.  Over and out. [" + FDGS.settings.lastImportDate + "]");
	}