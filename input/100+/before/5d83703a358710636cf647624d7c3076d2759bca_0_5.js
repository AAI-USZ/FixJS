function() {
	
		var BrowserDetect = {
		
			init: function () {
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
				
			},
			
			searchString: function (data) {
				for (var i = 0; i < data.length; i++)	{
					var dataString = data[i].string;
					var dataProp = data[i].prop;
					this.versionSearchString = data[i].versionSearch || data[i].identity;
					if (dataString) {
						if (dataString.indexOf(data[i].subString) != -1)
							return data[i].identity;
					}
					else if (dataProp)
						return data[i].identity;
				}
			},
			
			searchVersion: function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index == -1) return;
				var str = dataString.substring(index+this.versionSearchString.length+1).split(' ', 1).pop();
				return str.split('.', 2).join('.');
			},
			
			dataBrowser: [
				{ string: navigator.userAgent, subString: "Android", versionSearch: "Android", identity: "Android" },
				{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
				{ string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
				{ string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
				{ prop: window.opera, identity: "Opera", versionSearch: "Version" },
				{ string: navigator.vendor, subString: "iCab", identity: "iCab" },
				{ string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
				{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
				{ string: navigator.vendor, subString: "Camino", identity: "Camino" },
				{	string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
				{ string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
				{ string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
				{ string: navigator.userAgent, subString: "≈", identity: "Netscape", versionSearch: "Mozilla" }
			],
			dataOS : [
				{ string: navigator.userAgent, subString: "Android", identity: "Android" },
				{ string: navigator.userAgent, subString: "iPhone", identity: "iOS" },
				{ string: navigator.userAgent, subString: "iPad", identity: "iOS" },
				{ string: navigator.platform, subString: "Win", identity: "Windows" },
				{ string: navigator.platform, subString: "Mac", identity: "Mac" },
				{ string: navigator.platform, subString: "Linux", identity: "Linux" }
			]
		
		};
		
		BrowserDetect.init();
		
		return {
			browser: BrowserDetect.browser,
			version: BrowserDetect.version,
			os: BrowserDetect.OS,
			device: BrowserDetect.device
		}
	
	}