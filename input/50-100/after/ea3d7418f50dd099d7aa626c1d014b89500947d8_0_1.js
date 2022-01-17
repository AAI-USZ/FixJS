function(elem) {
				return ((elem.href.indexOf('flickr.com')>=0) && (elem.href.indexOf('/sets/') == -1) && (elem.href.indexOf('reddit.com/domain') == -1) && (elem.href.split('/').length > 5));
			}