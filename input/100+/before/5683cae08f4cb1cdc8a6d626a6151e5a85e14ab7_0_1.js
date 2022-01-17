function (rtl, targetId) {
		"use strict";
		var interval;
		if (navigator.userAgent.indexOf("Opera") !== -1) {
			interval = 5;
		} else {
			interval = 1;
		}
		if (rtl === false) {
			window.scroller = setInterval(function () { PAC._scroller(false, targetId); }, interval);
		} else {
			window.scroller = setInterval(function () { PAC._scroller(true, targetId); }, interval);
		}
	}