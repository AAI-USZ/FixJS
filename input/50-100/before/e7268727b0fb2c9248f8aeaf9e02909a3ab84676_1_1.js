function(videoID, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "http://blip.tv/players/episode/" + videoID + "?skin=api", true);
	var _this = this;
	xhr.addEventListener("load", function() {
		_this.processXML("http://blip.tv/rss/flash/" + xhr.responseXML.getElementsByTagName("id")[0].textContent, true, callback);
	}, false);
	xhr.send(null);
}