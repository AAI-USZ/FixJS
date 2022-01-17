function () {
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS";
				
				// check device
				var useragent = navigator.userAgent.toLowerCase();
				if (useragent.search("iphone") > 0 || useragent.search("ipod") > 0) this.device = 'phone';
				else if (useragent.search("ipad") > 0) this.device = 'tablet';
				else if (useragent.search("mobile") > 0 && this.OS == 'Android') this.device = 'phone';
				else if (this.OS == 'Android') this.device = 'tablet';
				else this.device = 'desktop';
				if (this.OS == 'Android' && useragent.search("galaxy_tab") > 0) this.device = 'tablet';
				
				// check scrolling
				if (this.device == 'desktop') this.nativeScroll = true;
				else if (this.OS == 'iOS' && navigator.userAgent.match(/ OS 5_/i)) this.nativeScroll = true;
				else if (navigator.userAgent.match(/ HTC/i) || navigator.userAgent.match(/ Desire_A8181/i)
				  || navigator.userAgent.match(/ myTouch4G/i) || navigator.userAgent.match(/ ADR6200/i)) {
				    this.nativeScroll = true;
				} else {
					this.nativeScroll = false;
				}
				
			}