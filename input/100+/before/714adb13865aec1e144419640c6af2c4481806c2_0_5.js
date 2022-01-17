function() {

		window.googletag = window.googletag || {};
		window.googletag.cmd = window.googletag.cmd || [];

		var gads = document.createElement('script');
		gads.async = true;
		gads.type = 'text/javascript';
		gads.onerror = function() { dfpBlocked(); };
		var useSSL = 'https:' === document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') +
		'//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);

		if(gads.style.display === 'none') {
			dfpBlocked();
		}

	}