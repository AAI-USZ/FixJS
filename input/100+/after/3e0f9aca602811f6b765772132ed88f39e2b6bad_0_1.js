function() {
		// dojox.mobile.configDeviceTheme should run only the first time dojox.mobile.deviceTheme runs, to establish
		// monitoring of which stylesheets get loaded for a given theme

		var dm = lang.getObject("dojox.mobile", true, this.getGlobal());
		if (dm && dm.deviceTheme) {
				var djConfig = this.getDojo().config,
					djConfigModel = this._getDojoJsElem().getAttribute('data-dojo-config'),
					ua = /*device ||*/ djConfig.mblUserAgent || 'none',
					themeMap,
					themeFiles;

				djConfigModel = djConfigModel ? require.eval("({ " + djConfigModel + " })", "data-dojo-config") : {};
				themeMap = djConfigModel.themeMap;
				themeFiles = djConfigModel.mblThemeFiles;

				// clear dynamic CSS
				delete this.themeCssFiles;
				delete this.cssFiles;

				// load CSS files specified by `themeMap`
				if (!themeMap) {
					// load defaults if not defined in file
					themeMap = Theme.getDojoxMobileThemeMap(this, dojo.clone(Theme.dojoMobileDefault));
					themeFiles = [];
				}
				this._addCssForDevice(ua, themeMap, this);

				dm.deviceTheme.themeMap = themeMap;		// djConfig.themeMap = themeMap;
				if (themeFiles) {
					djConfig.mblThemeFiles = themeFiles;
				} else {
					delete djConfig.mblThemeFiles;
				}

				if (this._selection) {
					// forces style palette to update cascade rules
					this.onSelectionChange(this._selection);
				}

				dm.deviceTheme.loadDeviceTheme(ua/*device*/);
		}

		// Set mobile device CSS files
		var mobileDevice = this.getMobileDevice();
		if (mobileDevice) {
			this.setMobileDevice(mobileDevice);
			this.visualEditor.setDevice(mobileDevice, true);
		}

		// Check mobile orientation
		var orientation = this.getMobileOrientation();
		if (orientation) {
			this.visualEditor.setOrientation(orientation);
		}
	}