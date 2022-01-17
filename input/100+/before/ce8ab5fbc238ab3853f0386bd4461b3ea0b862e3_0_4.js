function(elem) {
				var href = elem.href.split('?')[0];
				var groups = this.hashRe.exec(href);
				if (!groups) var albumGroups = this.albumHashRe.exec(href);
				if (groups && !groups[2]) {
					if (modules['showImages'].options.displayImageCaptions.value) {
						var apiURL = this.apiPrefix + 'image/' + groups[1] + '.json';
						if (apiURL in this.calls) {
							this.handleInfo(elem, this.calls[apiURL]);
						} else {
							GM_xmlhttpRequest({
								method: 'GET',
								url: apiURL,
//								aggressiveCache: true,
								onload: function(response) {
									try {
										var json = JSON.parse(response.responseText);
									} catch (error) {
										var json = {};
									}
									modules['showImages'].siteModules['imgur'].calls[apiURL] = json;
									modules['showImages'].siteModules['imgur'].handleInfo(elem, json);
								}
							});
						}
					} else {
						//If we don't show captions, then we can skip the API call.
						modules['showImages'].siteModules['imgur'].handleInfo(elem, {image: {
							links: {
								//Imgur doesn't really care about the extension and the browsers don't seem to either.
								original: 'http://i.imgur.com/'+groups[1]+'.jpg'
							}, image: {}}});
					}
				} else if (albumGroups && !albumGroups[2]) {
					//TODO: handle multi captions
					//TODO: handle multi links
					var apiURL = this.apiPrefix + 'album/' + albumGroups[1] + '.json';
					if (apiURL in this.calls) {
						this.handleInfo(elem, this.calls[apiURL]);
					} else {
						GM_xmlhttpRequest({
							method: 'GET',
							url: apiURL,
//							aggressiveCache: true,
							onload: function(response) {
								try {
									var json = JSON.parse(response.responseText);
								} catch (error) {
									var json = {};
								}
								modules['showImages'].siteModules['imgur'].calls[apiURL] = json;
								modules['showImages'].siteModules['imgur'].handleInfo(elem, json);
							}
						});
					}
				}
			}