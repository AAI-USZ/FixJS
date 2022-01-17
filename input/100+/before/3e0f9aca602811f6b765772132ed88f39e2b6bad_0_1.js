function() {
			var loadDeviceTheme = dm.loadDeviceTheme;

			dm.loadDeviceTheme = function(device) {
				var djConfig = this.getDojo().config,
					djConfigModel = this._getDojoJsElem().getAttribute('data-dojo-config'),
					ua = device || djConfig.mblUserAgent || 'none',
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

				// set/unset themeMap & themeFiles in VE DOM
				// XXX This won't work for Dojo 1.8, will need to set `themeMap` on
				//     Dojo config obj and reload VE iframe.
				dm.themeMap = themeMap;		// djConfig.themeMap = themeMap;
				if (themeFiles) {
					djConfig.mblThemeFiles = themeFiles;
				} else {
					delete djConfig.mblThemeFiles;
				}

				if (this._selection) {
					// forces style palette to update cascade rules
					this.onSelectionChange(this._selection);
				}

				loadDeviceTheme(device);
			}.bind(this);

			// This is a call-once function
			delete dm.configDeviceTheme;
		}