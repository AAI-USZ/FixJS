function() {
			var _this = this;

			//just in case it got stuck...
			chrome.browserAction.setIcon({"path": "icon-16x16.png"});

			//get the app settings and output to console
			_this.settings = extension_settings();
			if(this.settings.isDev) {
				_this.settings.log();
			}

			if(_this.settings.first_run) {
				_this.log("First time running the extension! Open the options page...");
				_this.openPage("options.html");
				_this.settings.first_run = false;
			}

			_this.setEnvironment();
			_this.initButton();
			_this.startKindleImport();
			if(_this.settings.doKindleImport && _this.settings.amazonImportInterval > 0) {
				_this.killAmazonImportInterval();
				_this.createAmazonImportInterval();
			}
			return this;
		}