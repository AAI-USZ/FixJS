function(cb) {

	var img = new Image();

	img.onload = function() {

		cb(true);

	};

	img.onerror = function() {

		cb(false);

	};

	img.src = "http://www.google-analytics.com/__utm.gif?" + Math.random() + new Date();

}