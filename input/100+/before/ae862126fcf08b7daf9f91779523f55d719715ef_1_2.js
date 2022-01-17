function () {
	function _ver(ver) {
		return parseFloat(ver) || ver;
	}
	var browser = jq.browser,
		agent = zk.agent = navigator.userAgent.toLowerCase();
	zk.safari = browser.safari && _ver(browser.version);
	zk.opera = browser.opera && _ver(browser.version);
	zk.ff = zk.gecko = browser.mozilla && _ver(browser.version);
	zk.ios = zk.safari && (agent.indexOf("iphone") >= 0 || agent.indexOf("ipad") >= 0);
	zk.android = zk.safari && (agent.indexOf('android') >= 0);
	zk.mobile = zk.ios || zk.android;
	zk.linux = agent.indexOf('linux') >= 0;
	zk.mac = !zk.ios && agent.indexOf('mac') >= 0;
	zk.chrome = zk.safari && agent.indexOf('chrome') >= 0;
	zk.safari_ = zk.safari && !zk.chrome; // safari only
	zk.css3 = true;
	
	var bodycls;
	if (zk.ff) {
		if (zk.ff < 5 //http://www.useragentstring.com/_uas_Firefox_version_5.0.php
		&& (bodycls = agent.indexOf("firefox/")) > 0)
			zk.ff = zk.gecko = _ver(agent.substring(bodycls + 8));
		bodycls = 'gecko gecko' + Math.floor(zk.ff);
	} else if (zk.opera) { //no longer to worry 10.5 or earlier
		bodycls = 'opera';
	} else {
		zk.iex = browser.msie && _ver(browser.version); //browser version
			//zk.iex is the Browser Mode (aka., Compatibility View)
			//while zk.ie is the Document Mode
		if (zk.iex) {
			if ((zk.ie = document.documentMode||zk.iex) < 6) //IE7 has no documentMode
				zk.ie = 6; //assume quirk mode
			zk.ie7 = zk.ie >= 7; //ie7 or later
			zk.ie8 = zk.ie >= 8; //ie8 or later
			zk.css3 = zk.ie9 = zk.ie >= 9; //ie9 or later
			zk.ie6_ = zk.ie < 7;
			zk.ie7_ = zk.ie == 7;
			zk.ie8_ = zk.ie == 8;
			bodycls = 'ie ie' + Math.floor(zk.ie);
		} else {
			if (zk.safari)
				bodycls = 'safari safari' + Math.floor(zk.safari);
		}
	}
	if ((zk.air = agent.indexOf("adobeair") >= 0) && zk.safari)
		bodycls = (bodycls || '') + ' air';

	if (bodycls)
		jq(function () {
			jq(document.body).addClass(bodycls);
		});
}