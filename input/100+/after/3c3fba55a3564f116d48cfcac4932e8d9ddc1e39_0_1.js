function(el, s) {

		// Settings
		this.el = el;
		this.s = $.extend({
			// Ref: http://www.useragentstring.com/pages/useragentstring.php
			// Cookies
			cookies:	true,
			mookie_msg:	'<p id="support-cookies">Please enable cookies to view this site. <a href="http://support.google.com/accounts/bin/answer.py?hl=en&answer=61416" target="_blank">How to enable Cookies</a>.</p>',
			// Browsers
			safari:		531,		// v5.0
			chrome:		535,		// v19
			msie:		7,
			mozilla:	12,
			opera:		false,		// no support
			browser_msg: '<p id="support-browser">Your browser may not support this site. Pages might not look or function quite right until you update your browser or download the latest version of <a href="http://www.google.com/chrome">Google Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>.</p>',
			test_browser: false,
			// Devices
			ipad:		534,		// v2:534, v1:533
			ipod:		6533,		// v4.3
			iphone:		6533,		// v4.3
			android:	533,		// 2.2
			blackberry:	false,		// no support
			windows_phone:	false,	// no support
			test_device:	false,
			// OS Version
			ipad_os:		4.3,
			ipod_os:		4.3,
			iphone_os:		4.3,
			android_os:		2.3,
			blackberry_os:	false,	// no support
			windows_phone_os: false,// no support
			device_msg:		'<p id="support-device">Your device may not support this site. Pages might not look or function quite right. If you are using Android or iOS (iPhone, iPad or iPods) please try updating your operating system</p>',
			test_mobile_os: false
		}, s);
		this.uagent = navigator.userAgent.toLowerCase();
		this.mobile = false;
		this.found = {};
		
		this.not_supported = [];
		
		this.test_cookies();
		this.test_devices();
		if(this.mobile) {
			this.get_os_version();
			if(this.s.test_mobile_os) this.test_os_version();
		}else {
			if(this.s.test_browser) this.test_browsers();
		}

		return this;
	}