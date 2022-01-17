function(goneWild, showMore) {
		//TODO: restructure this Regex stuff
		var re;
		if (this.options.hideNSFW.value) {
			re = /nsfw/i;
		} else {
			switch (goneWild) {
				case 'f':
					re = /[\[\{\<\(](f|fem|female)[\]\}\>\)]/i;
					break;
				case 'm':
					re = /[\[\{\<\(](m|man|male)[\]\}\>\)]/i;
					break;
			}
		}
		for (var i = 0, len = this.imageList.length; i < len; i++) {
			var image = this.imageList[i];
			var titleMatch = (goneWild?re.test(image.text):false);
			image.NSFW = false;
			if (this.options.hideNSFW.value) {
				image.NSFW = /nsfw/i.test(image.text);
			}
			//I suspect that this part is not necessary
			if (typeof(image.site) == 'undefined') {
				console.log('site missing', image);
				var siteFound = false;
				if (siteFound = this.siteModules['default'].detect(image)) {
					image.site = 'default';
				}
				if (!siteFound) {
					for (var site in this.siteModules) {
						if (site == 'default') continue;
						if (this.siteModules[site].detect(image)) {
							image.site = site;
							siteFound = true;
							break;
						}
					}
				}
			} else {
				var siteFound = true;
			}
			if (image.href && (goneWild == '' || titleMatch) && !image.NSFW && siteFound) {
				if (this.imageList[i].parentNode != null) {
					if (hasClass(this.imageList[i].parentNode,'title')) {
						this.revealImage(this.imageList[i].parentNode.nextSibling, showMore);
					} else {
						this.revealImage(this.imageList[i].nextSibling, showMore);
					}
				}
			}
		}
	}