function(ele) {
		var root = ele || document;
		var links = root.querySelectorAll('div.entry a.title');
		for (var i=0, len=links.length; i<len; i++) {
			if ((links[i].getAttribute('href').indexOf('youtube.com') != -1) || (links[i].getAttribute('href').indexOf('twitter.com') != -1) || (links[i].getAttribute('href').indexOf('teamliquid.net') != -1) || (links[i].getAttribute('href').indexOf('flickr.com') != -1) || (links[i].getAttribute('href').indexOf('github.com') != -1) || (links[i].getAttribute('href').indexOf('battle.net') != -1)) {
				links[i].removeAttribute('onmousedown');
			}
			// patch below for comments pages thanks to redditor and resident helperninja gavin19
			if (links[i].getAttribute('srcurl')) {
				if ((links[i].getAttribute('srcurl').indexOf('youtu.be') != -1) || (links[i].getAttribute('srcurl').indexOf('youtube.com') != -1) || (links[i].getAttribute('srcurl').indexOf('twitter.com') != -1) || (links[i].getAttribute('srcurl').indexOf('teamliquid.net') != -1) || (links[i].getAttribute('srcurl').indexOf('flickr.com') != -1) || (links[i].getAttribute('srcurl').indexOf('github.com') != -1) || (links[i].getAttribute('href').indexOf('github.com') != -1)) {
					links[i].removeAttribute('onmousedown');
				}
			}
		}
	}