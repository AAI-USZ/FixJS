function () {
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS";
				
				// check device
				var useragent = navigator.userAgent.toLowerCase();
				if (useragent.search("iphone") > 0 || useragent.search("ipod") > 0) this.device = 'Phone';
				else if (useragent.search("ipad") > 0) this.device = 'Tablet';
				else if (useragent.search("mobile") > 0 && this.OS == 'Android') this.device = 'Phone';
				else if (this.OS == 'Android') this.device = 'Tablet';
				else this.device = 'Desktop';
				if (this.OS == 'Android' || useragent.search("galaxy_tab") > 0) this.device = 'Tablet';
				
			}